import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "~/prisma.service";
import { Prisma, PrismaClient, ProjectType } from "@prisma/client";

import * as path from "path";
import * as fs from "fs/promises";

import { ProjectDto } from "~/project/dto/project.dto";
import { DeclineProjectDto } from "~/project/dto/decline-project.dto";
import { UserDto } from "~/user/dto/user.dto";
import { SearchProjectsQueryDto } from "~/project/dto/search-project-query.dto";
import { CreateProjectDto } from "~/project/dto/create-project.dto";
import { RatingService } from "~/rating/rating.service";
import { ProjectDetailsDto } from "~/project/dto/project-details.dto";
import { BaseProjectDto } from "~/project/dto/base-project.dto";
import { SearchProjectsDto } from "~/project/dto/search-project.dto";
import { SearchOrder } from "~/project/dto/search-order.dto";
import { AnalyticsService } from "~/analytics/analytics.service";

const restrictedNames = [
    "better_bedrock",
    "betterbedrock",
    "better-bedrock",
    "better_fogs",
    "clean_glass",
    "clean_water",
    "dark_mode",
    "dark_ui",
    "enchant_glint_switcher",
    "full_grass",
    "hit_particles",
    "low_fire",
    "particle_limiter",
    "waypoints",
];
const maxProjects = 5;

export const projectCreatorInclude = {
    user: {
        select: { name: true },
    },
};

export const projectTagsInclude = {
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
    userId: true,
    itemWeight: true,
    user: {
        select: { name: true },
    },
};

@Injectable()
export class ProjectService {
    constructor(
        private prismaService: PrismaService,
        private ratingService: RatingService,
        private analyticsService: AnalyticsService,
    ) {}

    async create(data: CreateProjectDto, admin: boolean) {
        const { title, userId } = data;
        const id = title
            .toLowerCase()
            .replace(/\s+/g, "_")
            .replace(/[^a-z0-9_]/g, "");

        if (!admin && restrictedNames.some((name) => id.includes(name))) {
            throw new ForbiddenException(`${title} is a restricted project name`);
        }

        const existingProject = await this.prismaService.project.findFirst({ where: { id } });

        if (existingProject) {
            throw new BadRequestException("Project with this name already exists");
        }

        const project = await this.prismaService.$transaction(async (prisma: PrismaClient) => {
            const drafts = await prisma.project.findMany({
                where: { userId, draft: true },
                select: { id: true },
            });

            const totalDrafts = drafts.length;

            if (totalDrafts > 0 && !admin) {
                const publishedIds = drafts.map((d) => d.id);

                const publishedSiblingCount = await prisma.project.count({
                    where: {
                        userId,
                        draft: false,
                        id: { in: publishedIds },
                    },
                });

                const unpublishedDrafts = totalDrafts - publishedSiblingCount;

                if (unpublishedDrafts >= maxProjects) {
                    throw new ForbiddenException(
                        `You can only have up to ${maxProjects} unpublished drafts`,
                    );
                }
            }

            const created = await prisma.project.create({
                data: {
                    id,
                    userId,
                    itemWeight: 0,
                    title,
                    description: "",
                    type: ProjectType.texturepacks,
                },
                include: projectTagsInclude,
            });

            return created;
        });

        await this.createProjectFolders(project.id);

        return project;
    }

    async search(query: SearchProjectsQueryDto): Promise<SearchProjectsDto> {
        const { text, type, page = 1 } = query;
        const limit = 10;
        const candidateLimit = 200;

        const baseWhere: Prisma.ProjectWhereInput = { draft: false };
        if (type) baseWhere.type = type as ProjectType;

        const isPopularityOrder = [
            SearchOrder.mostPopularThisWeek,
            SearchOrder.mostPopularThisMonth,
            SearchOrder.mostPopularThisYear,
        ].includes(query.order ?? SearchOrder.newest);

        const getOrderBy = (): Prisma.ProjectOrderByWithRelationInput => {
            switch (query.order) {
                case SearchOrder.oldest:
                    return { lastChanged: "asc" };
                default:
                    return { lastChanged: "desc" };
            }
        };

        const tokenize = (s: string): string[] =>
            Array.from(
                new Set(
                    s
                        .toLowerCase()
                        .split(/[\s\W_]+/)
                        .map((tok) => tok.trim())
                        .filter((tok) => tok.length >= 2),
                ),
            ).slice(0, 10);

        const buildSearchWhere = (
            searchText: string,
            tokens: string[],
        ): Prisma.ProjectWhereInput => {
            if (tokens.length === 0) {
                return {
                    ...baseWhere,
                    OR: [
                        { title: { contains: searchText, mode: "insensitive" } },
                        { user: { is: { name: { contains: searchText, mode: "insensitive" } } } },
                        { tags: { some: { name: { contains: searchText, mode: "insensitive" } } } },
                    ],
                };
            }

            return {
                ...baseWhere,
                OR: tokens.flatMap((tok) => [
                    { title: { contains: tok, mode: "insensitive" } },
                    { user: { is: { name: { contains: tok, mode: "insensitive" } } } },
                    { tags: { some: { name: { contains: tok, mode: "insensitive" } } } },
                ]),
            };
        };

        const scoreProject = (
            proj: {
                title: string;
                user: { name: string } | null;
                tags: { name: string }[];
                description: unknown;
            },
            tokens: string[],
        ): number => {
            if (!proj || tokens.length === 0) return 0;

            const title = (proj.title ?? "").toLowerCase();
            const username = (proj.user?.name ?? "").toLowerCase();
            const tags = (proj.tags ?? []).map((t) => t.name.toLowerCase());
            const desc =
                proj.description !== null && proj.description !== undefined
                    ? JSON.stringify(proj.description).toLowerCase()
                    : "";

            const SCORE_WEIGHTS = { title: 5, tag: 3, username: 2, description: 1 };
            let score = 0;

            for (const tok of tokens) {
                if (tags.some((tag) => tag.includes(tok))) score += SCORE_WEIGHTS.tag;
                if (title.includes(tok)) score += SCORE_WEIGHTS.title;
                if (username.includes(tok)) score += SCORE_WEIGHTS.username;
                if (desc.includes(tok)) score += SCORE_WEIGHTS.description;
            }
            return score;
        };

        const countDownloads = async (projectId: string): Promise<number> => {
            const projectAnalytics = await this.analyticsService.projectAnalytics(
                projectId,
                query.order,
            );
            return projectAnalytics.reduce((acc, curr) => acc + curr.value, 0);
        };

        const detailedSelect = {
            ...simpleProjectSelect,
            description: true,
            tags: true,
            lastChanged: true,
        };

        const tokens = text?.trim() ? tokenize(text) : [];
        const hasSearchText = text?.trim();

        if (!hasSearchText && !isPopularityOrder) {
            const [items, total] = await this.prismaService.$transaction([
                this.prismaService.project.findMany({
                    where: baseWhere,
                    orderBy: getOrderBy(),
                    select: simpleProjectSelect,
                    skip: (page - 1) * limit,
                    take: limit,
                }),
                this.prismaService.project.count({ where: baseWhere }),
            ]);

            const detailedItems = await Promise.all(
                items.map(async (p) => {
                    const projectDetails = await this.getProjectDetails(p);
                    return { ...p, ...projectDetails };
                }),
            );

            return {
                items: detailedItems,
                total,
                page,
                totalPages: Math.ceil(total / limit),
            };
        }

        const searchWhere = hasSearchText ? buildSearchWhere(text ?? "", tokens) : baseWhere;

        const candidates = await this.prismaService.project.findMany({
            where: searchWhere,
            orderBy: { lastChanged: "desc" },
            select: detailedSelect,
            take: candidateLimit,
        });

        let scored;

        if (isPopularityOrder) {
            const calculatedDownloads = await Promise.all(
                candidates.map(async (proj) => {
                    const score = await countDownloads(proj.id);
                    return { proj, score };
                }),
            );
            scored = calculatedDownloads.sort((a, b) => b.score - a.score);
        } else {
            scored = candidates
                .map((proj) => ({ proj, score: scoreProject(proj, tokens) }))
                .filter((item) => item.score > 0)
                .sort((a, b) =>
                    b.score !== a.score
                        ? b.score - a.score
                        : new Date(b.proj.lastChanged).getTime() -
                          new Date(a.proj.lastChanged).getTime(),
                );
        }

        const total = scored.length;
        const paged = scored.slice((page - 1) * limit, page * limit).map((s) => s.proj);

        const detailedItems = await Promise.all(
            paged.map(async (p) => {
                const projectDetails = await this.getProjectDetails(p);
                return { ...p, ...projectDetails };
            }),
        );

        return {
            items: detailedItems,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };
    }

    async userProjects(userId: string, user: UserDto | undefined = undefined) {
        const all = user ? userId === user.id : false;

        const projects = await this.prismaService.project.findMany({
            where: { userId, draft: all ? undefined : false },
            select: simpleProjectSelect,
        });

        return Promise.all(
            projects.map(async (p) => {
                const projectDetails = await this.getProjectDetails(p);
                return { ...p, ...projectDetails };
            }),
        );
    }

    async projectDetails(id: string) {
        const project = await this.prismaService.project.findUnique({
            where: { id_draft: { id, draft: false } },
            include: { ...projectTagsInclude, ...projectCreatorInclude },
        });

        if (!project) {
            throw new NotFoundException("Could not find details about this project");
        }

        const [projectRating, userRating] = await Promise.all([
            this.ratingService.getProjectRating(project.id),
            this.ratingService.getProfileRating(project.userId),
        ]);

        return {
            ...project,
            rating: projectRating,
            user: { ...project.user, rating: userRating.average },
        };
    }

    async basicInfo(ids: string[]) {
        const items = await this.prismaService.project.findMany({
            where: { id: { in: ids }, draft: false },
            orderBy: { lastChanged: "desc" },
            select: simpleProjectSelect,
        });

        return Promise.all(
            items.map(async (p) => {
                const projectDetails = await this.getProjectDetails(p);
                return { ...p, ...projectDetails };
            }),
        );
    }

    async update(project: ProjectDto, data: Partial<ProjectDto>) {
        if (project.submitted) {
            throw new BadRequestException("Project has already been submitted");
        }

        const tags = data.tags?.map((tag) => tag.name) ?? [];
        const updateData: Prisma.ProjectUpdateInput = {
            ...data,
            lastChanged: new Date(),
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
            include: projectTagsInclude,
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

    async submitForReview(project: ProjectDto) {
        if (project.submitted) {
            throw new BadRequestException("Project has already been submitted");
        }

        if (!(await this.existsDownloadFile(project.id))) {
            throw new NotFoundException("Project does not have downloadable file");
        }

        const submittedProject = await this.prismaService.project.update({
            where: { id_draft: { id: project.id, draft: true } },
            data: { submitted: true, error: null, lastChanged: new Date() },
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
        return this.prismaService.project.update({
            where: { id_draft: { id, draft: true } },
            data: { submitted: false },
        });
    }

    async publish(id: string) {
        const draftProject = await this.prismaService.project.findUnique({
            where: { id_draft: { id, draft: true } },
            include: { tags: true },
        });

        if (!draftProject?.submitted) {
            throw new BadRequestException("This project has not been submitted");
        }

        const oldReleasedProject = await this.prismaService.project.findUnique({
            where: { id_draft: { id, draft: false } },
            select: {
                createdAt: true,
            },
        });

        if (!draftProject) throw new NotFoundException("Draft project not found");

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
            include: projectTagsInclude,
        });

        await this.prismaService.project.update({
            where: { id_draft: { id, draft: true } },
            data: { submitted: false },
        });

        return releaseProject;
    }

    async decline(id: string, data: DeclineProjectDto) {
        const draftProject = await this.prismaService.project.findUnique({
            where: { id_draft: { id, draft: true } },
            include: { tags: true },
        });

        if (!draftProject?.submitted) {
            throw new BadRequestException("This project has not been submitted");
        }

        return this.prismaService.project.update({
            where: { id_draft: { id, draft: true } },
            data: { error: data.error, submitted: false },
            include: projectTagsInclude,
        });
    }

    async submitted() {
        const items = await this.prismaService.project.findMany({
            where: { submitted: true },
            orderBy: { lastChanged: "desc" },
            select: simpleProjectSelect,
        });

        return Promise.all(
            items.map(async (p) => {
                const projectDetails = await this.getProjectDetails(p);
                return { ...p, ...projectDetails };
            }),
        );
    }

    async delete(id: string) {
        await this.prismaService.project.deleteMany({ where: { id } });
        await this.deleteProjectProductionFolders(id);
        await this.deleteProjectDraftFolders(id);
    }

    async deleteProduction(id: string) {
        await this.prismaService.project.deleteMany({ where: { id, draft: false } });
        await this.deleteProjectProductionFolders(id);
    }

    async findOne(id: string) {
        return this.prismaService.project.findFirst({ where: { id } });
    }

    /**
     *  Private Functions
     */

    private async getProjectDetails(project: BaseProjectDto): Promise<ProjectDetailsDto> {
        const [projectRating, userRating] = await Promise.all([
            this.ratingService.getProjectRating(project.id),
            this.ratingService.getProfileRating(project.userId),
        ]);

        return {
            rating: projectRating,
            user: { name: project.user.name, rating: userRating.average },
        };
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

    private async deleteProjectDraftFolders(id: string) {
        const baseDir = path.join(process.cwd(), "static");

        const draftFolders = [
            path.join(baseDir, "private", id, "draft"),
            path.join(baseDir, "public", id, "draft"),
        ];

        for (const folder of draftFolders) {
            try {
                await fs.rm(folder, { recursive: true, force: true });
            } catch (err) {
                console.warn(`Failed to delete draft folder ${folder}:`, err);
            }
        }
    }

    private async deleteProjectProductionFolders(id: string) {
        const baseDir = path.join(process.cwd(), "static");

        const releaseFolders = [
            path.join(baseDir, "private", id, "release"),
            path.join(baseDir, "public", id, "release"),
        ];

        for (const folder of releaseFolders) {
            try {
                await fs.rm(folder, { recursive: true, force: true });
            } catch (err) {
                console.warn(`Failed to delete release folder ${folder}:`, err);
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

            if (newNode.type === "gallery" && Array.isArray(newNode.attrs?.images)) {
                newNode.attrs = {
                    ...newNode.attrs,
                    images: newNode.attrs.images.map((img: string) => {
                        const fileName = String(img).split("/").pop();
                        return `static/public/${projectId}/release/${fileName}`;
                    }),
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

            if (node.type === "gallery") {
                srcs.push(...node.attrs.images);
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

    private async createProjectFolders(id: string) {
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

    private async moveDraftToRelease(projectId: string) {
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
