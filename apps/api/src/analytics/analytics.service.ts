import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { AnalyticsType } from "@prisma/client";
import dayjs from "dayjs";
import { lastValueFrom } from "rxjs";
import { AnalyticsDto } from "~/analytics/dto/analytics.dto";
import { LootlabsReportResponseDto } from "~/analytics/dto/lootlabs-report-response.dto";
import { PrismaService } from "~/prisma.service";
import { SearchOrder } from "~/project/dto/search-order.dto";
import { createId } from "@paralleldrive/cuid2";
import { AnalyticsNames } from "~/analytics/constants/analytics-names";

@Injectable()
export class AnalyticsService {
    constructor(
        private prismaService: PrismaService,
        private httpService: HttpService,
    ) {}

    async analytics() {
        const topFileProjects = await this.prismaService.analytics.groupBy({
            by: ["name"],
            where: { type: "file" },
            _sum: { value: true },
            orderBy: {
                _sum: { value: "desc" },
            },
            take: 10,
        });

        const topFileNames = topFileProjects.map((p) => p.name);
        const lootlabsData = await this.lootlabsStatistics();
        const analytics = await this.prismaService.analytics.findMany({
            where: {
                OR: [
                    { type: { not: "file" } },
                    {
                        type: "file",
                        name: { in: topFileNames },
                    },
                ],
            },
            orderBy: { date: "asc" },
        });

        return [...analytics, ...lootlabsData];
    }

    async lootlabsStatistics() {
        const token = process.env.MONETIZATION_API_KEY;
        const method = process.env.MONETIZATION_API_METHOD;

        if (!token || method !== "lootlabs") {
            return [];
        }

        try {
            const response$ = this.httpService.get<LootlabsReportResponseDto>(
                `https://creators.lootlabs.gg/api/public/reports?api_token=${token}&feeds=1237958&from_date=${dayjs("2026-02-01").format("YYYY-MM-DD")}&to_date=${dayjs().format("YYYY-MM-DD")}&columns=total_revenue,total_impressions&group_by=report_date`,
            );

            const { data } = await lastValueFrom(response$);

            const analytics: AnalyticsDto[] = [];

            data.message.results.map((result) => {
                analytics.push({
                    id: createId(),
                    type: "general",
                    date: dayjs(result.report_date).toDate(),
                    name: AnalyticsNames.adsRevenue,
                    value: parseFloat((result.total_revenue || 0).toFixed(2)),
                });
                analytics.push({
                    id: createId(),
                    type: "general",
                    date: dayjs(result.report_date).toDate(),
                    name: AnalyticsNames.adsImpressions,
                    value: result.total_impressions || 0,
                });
            });

            return analytics.sort((a, b) => a.date.getTime() - b.date.getTime());
        } catch (_) {
            return [];
        }
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
