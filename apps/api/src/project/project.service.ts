import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { PrismaService } from "~/prisma.service";
import { Prisma } from "@prisma/client";

import * as path from "path";
import * as fs from "fs/promises";

import { ProjectDto } from "~/project/dto/project.dto";
import { DeclineProjectDto } from "~/project/dto/decline-project.dto";
import { SimpleProjectDto } from "~/project/dto/simple-project.dto";
import { UserDto } from "~/user/dto/user.dto";

const simpleProjectSelect = {
    id: true,
    title: true,
    thumbnail: true,
    tags: true,
    type: true,
    lastChanged: true,
    betterBedrockContent: true,
    draft: true,
    user: {
        select: { name: true },
    },
};

@Injectable()
export class ProjectService {
    constructor(private readonly prismaService: PrismaService) {}
    async create(
        data:
            | Prisma.ProjectCreateInput
            | (Omit<Prisma.ProjectCreateInput, "user"> & { userId: string }),
    ) {
        const project = await this.prismaService.project.create({ data: data });

        await this.createProjectFolders(data.id);

        return project;
    }

    async findAll(): Promise<ProjectDto[]> {
        return await this.prismaService.project.findMany();
    }

    async findOne(id: string) {
        return await this.prismaService.project.findFirst({ where: { id } });
    }

    async userProjects(
        userId: string,
        user: UserDto | undefined = undefined,
    ): Promise<SimpleProjectDto[]> {
        const all = user ? userId === user.id : false;

        return await this.prismaService.project.findMany({
            where: { userId, draft: all ? undefined : false },
            select: simpleProjectSelect,
        });
    }

    async projectDetails(id: string): Promise<ProjectDto> {
        return await this.prismaService.project.findUniqueOrThrow({
            where: { id_draft: { id, draft: false } },
        });
    }

    async draftDetails(id: string): Promise<ProjectDto> {
        return await this.prismaService.project.findUniqueOrThrow({
            where: { id_draft: { id, draft: true } },
        });
    }

    async submitForReview(project: ProjectDto) {
        if (project.submitted) {
            throw new BadRequestException("Project has already been submitted");
        }

        if (!(await this.existsDownloadFile(project.id))) {
            throw new NotFoundException("Project does not have downloadable file");
        }

        const submittedProject = await this.prismaService.project.update({
            where: { id_draft: { id: project.id, draft: true } },
            data: { submitted: true },
        });

        const thumbnailFile = path.basename(project.thumbnail ?? "");

        await this.cleanupDraftImages(
            project.id,
            thumbnailFile === "" ? [] : [thumbnailFile],
            project.description,
        );

        return submittedProject;
    }

    async cancelSubmission(id: string) {
        return await this.prismaService.project.update({
            where: { id_draft: { id, draft: true } },
            data: { submitted: false },
        });
    }

    async publish(id: string) {
        const draftProject = await this.prismaService.project.findUnique({
            where: { id_draft: { id, draft: true } },
        });

        const oldReleasedProject = await this.prismaService.project.findUnique({
            where: { id_draft: { id, draft: false } },
            select: {
                createdAt: true,
            },
        });

        if (!draftProject) throw new Error("Draft project not found");

        await this.moveDraftToRelease(id);

        const updatedDescription = this.replaceDraftImageSrcs(draftProject.description, id);
        const updatedThumbnail = draftProject.thumbnail
            ? draftProject.thumbnail.replace(
                  new RegExp(`static/public/${id}/draft/`, "g"),
                  `static/public/${id}/release/`,
              )
            : null;
        const updatedDownloadFile = draftProject.downloadFile
            ? draftProject.downloadFile.replace(
                  new RegExp(`static/private/${id}/draft/`, "g"),
                  `static/private/${id}/release/`,
              )
            : null;

        Logger.error({ updatedThumbnail, updatedDownloadFile, updatedDescription });

        const { id: projectId, ...rest } = draftProject;
        const releaseProjectData = {
            ...rest,
            draft: false,
            submitted: false,
            createdAt: oldReleasedProject ? oldReleasedProject.createdAt : new Date(),
            lastChanged: new Date(),
            description: updatedDescription,
            thumbnail: updatedThumbnail,
            downloadFile: updatedDownloadFile,
            error: null,
        };

        const releaseProject = await this.prismaService.project.upsert({
            where: { id_draft: { id, draft: false } },
            update: releaseProjectData,
            create: {
                ...releaseProjectData,
                id: projectId,
            },
        });

        await this.prismaService.project.update({
            where: { id_draft: { id, draft: true } },
            data: { submitted: false },
        });

        return releaseProject;
    }

    async decline(id: string, data: DeclineProjectDto) {
        return await this.prismaService.project.update({
            where: { id_draft: { id, draft: false } },
            data: { error: data.error, submitted: false },
        });
    }

    async update(project: ProjectDto, data: Partial<ProjectDto>) {
        if (project.submitted) {
            throw new BadRequestException("Project has already been submitted");
        }

        const updateData = {
            ...data,
            description: data.description as Prisma.InputJsonValue | undefined,
        };
        const updatedProject = await this.prismaService.project.update({
            where: { id_draft: { id: project.id, draft: true } },
            data: updateData,
        });

        if (data.description) {
            const thumbnailFile = path.basename(updatedProject.thumbnail ?? "");
            await this.cleanupDraftImages(
                project.id,
                thumbnailFile === "" ? [] : [thumbnailFile],
                data.description,
            );
        }

        return updatedProject;
    }

    async submitted(): Promise<SimpleProjectDto[]> {
        return await this.prismaService.project.findMany({
            where: { submitted: true },
            select: simpleProjectSelect,
        });
    }

    async delete(id: string) {
        await this.prismaService.project.deleteMany({ where: { id } });
        this.deleteProjectFolders(id);
    }

    private async deleteProjectFolders(id: string): Promise<void> {
        const baseDir = path.join(process.cwd(), "static");

        const folders = [path.join(baseDir, "private", id), path.join(baseDir, "public", id)];

        for (const folder of folders) {
            try {
                await fs.rm(folder, { recursive: true, force: true });
            } catch (err) {
                // Optional: log errors if needed
                console.warn(`Failed to delete folder ${folder}:`, err);
            }
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private replaceDraftImageSrcs(node: any, projectId: string): any {
        if (Array.isArray(node)) {
            return node.map((n) => this.replaceDraftImageSrcs(n, projectId));
        } else if (typeof node === "object" && node !== null) {
            const newNode = { ...node };

            if (
                newNode.type === "image" &&
                newNode.attrs?.src &&
                typeof newNode.attrs.src === "string"
            ) {
                const fileName = String(newNode.attrs.src).split("/").pop();
                newNode.attrs = {
                    ...newNode.attrs,
                    src: `static/public/${projectId}/release/${fileName}`,
                };
            }
            for (const key in newNode) {
                if (key !== "attrs") {
                    newNode[key] = this.replaceDraftImageSrcs(newNode[key], projectId);
                }
            }
            return newNode;
        }
        return node;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private extractImageSrcs(node: any): string[] {
        let srcs: string[] = [];
        if (Array.isArray(node)) {
            for (const n of node) srcs = srcs.concat(this.extractImageSrcs(n));
        } else if (typeof node === "object" && node !== null) {
            if (node.type === "image" && node.attrs?.src) {
                srcs.push(node.attrs.src);
            }
            for (const key in node) {
                srcs = srcs.concat(this.extractImageSrcs(node[key]));
            }
        }
        return srcs;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private async cleanupDraftImages(projectId: string, include: string[], description: any) {
        const draftDir = path.join(process.cwd(), "static", "public", projectId, "draft");
        let files: string[] = [];
        try {
            files = await fs.readdir(draftDir);
        } catch {
            return;
        }

        const usedSrcs = new Set([
            ...this.extractImageSrcs(description).map((src) => path.basename(src)),
            ...include,
        ]);

        for (const file of files) {
            if (!usedSrcs.has(file)) {
                await fs.unlink(path.join(draftDir, file));
            }
        }
    }

    private async createProjectFolders(id: string): Promise<void> {
        const baseDir = path.join(process.cwd(), "static");

        const folders = [
            path.join(baseDir, "private", id, "release"),
            path.join(baseDir, "private", id, "draft"),
            path.join(baseDir, "public", id, "release"),
            path.join(baseDir, "public", id, "draft"),
        ];

        for (const folder of folders) {
            await fs.mkdir(folder, { recursive: true });
        }
    }

    private async moveDraftToRelease(projectId: string): Promise<void> {
        const baseDir = path.join(process.cwd(), "static");
        const locations = ["private", "public"];

        for (const location of locations) {
            const draftDir = path.join(baseDir, location, projectId, "draft");
            const releaseDir = path.join(baseDir, location, projectId, "release");

            try {
                await fs.mkdir(releaseDir, { recursive: true });

                // files from draft
                const draftFiles = await fs.readdir(draftDir);

                // files already in release
                const releaseFiles = await fs.readdir(releaseDir);

                // Copy draft -> release
                for (const file of draftFiles) {
                    const src = path.join(draftDir, file);
                    const dest = path.join(releaseDir, file);
                    await fs.copyFile(src, dest);
                }

                // Remove files from release that aren’t in draft
                for (const file of releaseFiles) {
                    if (!draftFiles.includes(file)) {
                        await fs.rm(path.join(releaseDir, file), { recursive: true, force: true });
                    }
                }
            } catch (_) {
                // Optionally handle errors (e.g., log if draftDir doesn't exist)
            }
        }
    }

    private async existsDownloadFile(projectId: string): Promise<boolean> {
        const dir = path.join(process.cwd(), "static", "private", projectId, "draft");
        try {
            const files = await fs.readdir(dir);
            return files.some((f) => path.parse(f).name === "file");
        } catch {
            return false;
        }
    }
}
