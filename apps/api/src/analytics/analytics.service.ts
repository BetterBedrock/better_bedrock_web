import { Injectable } from "@nestjs/common";
import { AnalyticsType } from "@prisma/client";
import dayjs from "dayjs";
import { PrismaService } from "~/prisma.service";
import { ProjectService } from "~/project/project.service";

@Injectable()
export class AnalyticsService {
    constructor(
        private prisma: PrismaService,
        private readonly projectService: ProjectService,
    ) {}

    async analytics() {

    async userAnalytics(id: string) {
        const projects = await this.projectService.userProjects(id);

        const projectNames = projects.map((project) => project.id);

        return this.prismaService.analytics.findMany({
            where: {
                name: {
                    in: projectNames,
                },
                type: "file",
            },
        });
    }

    async incrementAnalytics(name: string, type: AnalyticsType) {
        const today = dayjs().toISOString();

        return await this.prisma.analytics.upsert({
            where: {
                name_date_type: { name, date: today, type },
            },
            update: {
                value: { increment: 1 },
            },
            create: {
                name,
                type,
                date: today,
                value: 1,
            },
        });
    }

    async userAnalytics(id: string) {
        const projects = await this.projectService.userProjects(id);

        const projectNames = projects.map((project) => project.id);

        return await this.prisma.analytics.findMany({
            where: {
                name: {
                    in: projectNames,
                },
                type: "file",
            },
        });
    }
}
