import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { PrismaService } from "~/prisma.service";
import { Prisma } from "@prisma/client";

import * as path from "path";
import * as fs from "fs/promises";

import { ProjectDto } from "~/project/dto/project.dto";
import { DeclineProjectDto } from "~/project/dto/decline-project.dto";
import { SimpleProjectDto } from "~/project/dto/simple-project.dto";
import { UserDto } from "~/user/dto/user.dto";
import { SearchProjectsQueryDto } from "~/project/dto/search-project-query.dto";
import { ProjectTagDto } from "~/project/dto/project-tag.dto";

const projectInclude = {
    tags: { select: { name: true } },
};

const simpleProjectSelect = {
    id: true,
    title: true,
    thumbnail: true,
    tags: { select: { name: true } },
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

    async search(query: SearchProjectsQueryDto) {
        const { text, type, page = 1 } = query;
        const limit = 20;
        const candidateLimit = 200;

        // --- 1. Build base filter ---
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const baseWhere: any = { draft: false };
        if (type) baseWhere.type = type;

        // --- 2. Short-circuit: No text, simple DB query ---
        if (!text?.trim()) {
            const [items, total] = await this.prismaService.$transaction([
                this.prismaService.project.findMany({
                    where: baseWhere,
                    orderBy: { lastChanged: "desc" },
                    select: simpleProjectSelect,
                    skip: (page - 1) * limit,
                    take: limit,
                }),
                this.prismaService.project.count({ where: baseWhere }),
            ]);
            return { items, total, page, totalPages: Math.ceil(total / limit) };
        }

        // --- 3. Normalize and tokenize input ---
        function tokenize(s: string) {
            return Array.from(
                new Set(
                    s
                        .toLowerCase()
                        .split(/[\s\W_]+/)
                        .map((tok) => tok.trim())
                        .filter((tok) => tok.length >= 2),
                ),
            ).slice(0, 10);
        }
        const tokens = tokenize(text);

        // If text doesn't produce tokens, fallback to general contains
        if (tokens.length === 0) {
            const where = {
                ...baseWhere,
                OR: [
                    { title: { contains: text, mode: "insensitive" } },
                    { user: { is: { name: { contains: text, mode: "insensitive" } } } },
                    { tags: { some: { name: { contains: text, mode: "insensitive" } } } },
                ],
            };
            const [items, total] = await this.prismaService.$transaction([
                this.prismaService.project.findMany({
                    where,
                    orderBy: { lastChanged: "desc" },
                    select: simpleProjectSelect,
                    skip: (page - 1) * limit,
                    take: limit,
                }),
                this.prismaService.project.count({ where }),
            ]);

            return { items, total, page, totalPages: Math.ceil(total / limit) };
        }

        // --- 4. Broad DB fetch (matches any token in title/user/tags) ---
        const anyMatchWhere = {
            ...baseWhere,
            OR: tokens.flatMap((tok) => [
                { title: { contains: tok, mode: "insensitive" } },
                { user: { is: { name: { contains: tok, mode: "insensitive" } } } },
                { tags: { some: { name: { contains: tok, mode: "insensitive" } } } },
            ]),
        };

        const candidates = await this.prismaService.project.findMany({
            where: anyMatchWhere,
            orderBy: { lastChanged: "desc" },
            select: {
                ...simpleProjectSelect,
                description: true,
                user: { select: { name: true, id: true } },
                tags: true,
                lastChanged: true,
            },
            take: candidateLimit,
        });

        Logger.error({ candidates });

        // --- 5. Scoring: TAGS are crucial! ---
        const SCORE_WEIGHTS = {
            title: 5,
            tag: 3,
            username: 2,
            description: 1,
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function scoreProject(proj: any) {
            let score = 0;
            if (!proj) return score;
            const title = (proj.title ?? "").toLowerCase();
            const username = (proj.user?.name ?? "").toLowerCase();
            const tags = (proj.tags ?? []).map((t: ProjectTagDto) => t.name.toLowerCase());
            const desc = proj.description ? JSON.stringify(proj.description).toLowerCase() : "";

            console.log({ desc });

            for (const tok of tokens) {
                if (tags.some((tag) => tag.includes(tok))) score += SCORE_WEIGHTS.tag;
                if (title.includes(tok)) score += SCORE_WEIGHTS.title;
                if (username.includes(tok)) score += SCORE_WEIGHTS.username;
                if (desc.includes(tok)) score += SCORE_WEIGHTS.description;
            }
            return score;
        }

        const scored = candidates
            .map((proj) => ({ proj, score: scoreProject(proj) }))
            .filter((item) => item.score > 0)
            .sort((a, b) =>
                b.score !== a.score
                    ? b.score - a.score
                    : new Date(b.proj.lastChanged).getTime() -
                      new Date(a.proj.lastChanged).getTime(),
            );

        Logger.error({ score: scoreProject(candidates[0]) });

        const total = scored.length;
        const paged = scored.slice((page - 1) * limit, page * limit).map((s) => s.proj);

        return {
            items: paged,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };
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
            include: projectInclude,
        });
    }

    async draftDetails(id: string): Promise<ProjectDto> {
        return await this.prismaService.project.findUniqueOrThrow({
            where: { id_draft: { id, draft: true } },
            include: projectInclude,
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
            include: { tags: true },
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

        const { id: projectId, tags, ...rest } = draftProject;
        const releaseTags = tags.map((tag) => ({
            name: tag.name,
        }));

        await this.prismaService.tag.deleteMany({ where: { projectId: id, projectDraft: false } });

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
            tags: {
                connectOrCreate: releaseTags.map((tag) => ({
                    where: {
                        projectId_projectDraft_name: {
                            name: tag.name,
                            projectDraft: false,
                            projectId,
                        },
                    },
                    create: {
                        name: tag.name,
                    },
                })),
            },
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

        const tags = data.tags?.map((tag) => tag.name) ?? [];
        const updateData: Prisma.ProjectUpdateInput = {
            ...data,
            description: data.description as Prisma.InputJsonValue | undefined,
            ...(data.tags !== undefined
                ? {
                      tags: await this.buildTagUpdate(project.id, tags),
                  }
                : { tags: undefined }),
        };

        const updatedProject = await this.prismaService.project.update({
            where: { id_draft: { id: project.id, draft: true } },
            data: updateData,
            include: projectInclude,
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

    private async buildTagUpdate(
        projectId: string,
        tags: string[],
    ): Promise<Prisma.TagUpdateManyWithoutProjectNestedInput> {
        if (tags.length === 0) {
            return { deleteMany: {} };
        }

        const existingTags = await this.prismaService.tag.findMany({
            where: { projectId, projectDraft: true },
            select: { name: true },
        });

        const existingTagNames = new Set(existingTags.map((t) => t.name));
        const newTagNames = new Set(tags);

        const tagsToDelete = existingTagNames.difference(newTagNames);
        const tagsToCreate = newTagNames.difference(existingTagNames);

        return {
            ...(tagsToDelete.size > 0 && {
                deleteMany: { name: { in: [...tagsToDelete] } },
            }),
            ...(tagsToCreate.size > 0 && {
                connectOrCreate: [...tagsToCreate].map((tag) => ({
                    where: {
                        projectId_projectDraft_name: {
                            projectId,
                            projectDraft: true,
                            name: tag,
                        },
                    },
                    create: {
                        name: tag,
                    },
                })),
            }),
        };
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
