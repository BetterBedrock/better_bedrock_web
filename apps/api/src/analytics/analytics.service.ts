import { Injectable } from "@nestjs/common";
import { AnalyticsType } from "@prisma/client";
import dayjs from "dayjs";
import { PrismaService } from "~/prisma.service";
import { SearchOrder } from "~/project/dto/search-order.dto";

@Injectable()
export class AnalyticsService {
    constructor(private prismaService: PrismaService) {}

    async analytics() {
        return this.prismaService.analytics.findMany();
    }

    async projectAnalytics(projectId: string, search?: SearchOrder) {
        const take = () => {
            if (search === SearchOrder.mostPopularThisMonth) return 30;
            if (search === SearchOrder.mostPopularThisWeek) return 7;
            if (search === SearchOrder.mostPopularThisYear) return 365;

            return undefined;
        };

        return this.prismaService.analytics.findMany({
            where: { name: projectId, type: "file" },
            take: take(),
        });
    }

    async userAnalytics(id: string) {
        const projects = await this.prismaService.project.findMany({ where: { userId: id } });

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

        return this.prismaService.analytics.upsert({
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
}
