import { HttpService } from "@nestjs/axios";
import { Inject, Injectable } from "@nestjs/common";
import { AnalyticsType } from "@prisma/client";
import dayjs from "dayjs";
import { lastValueFrom } from "rxjs";
import { AnalyticsDto } from "~/analytics/dto/analytics.dto";
import { LootlabsReportResponseDto } from "~/analytics/dto/lootlabs-report-response.dto";
import { PrismaService } from "~/prisma.service";
import { SearchOrder } from "~/project/dto/search-order.dto";
import { createId } from "@paralleldrive/cuid2";
import { AnalyticsNames } from "~/analytics/constants/analytics-names";
import Stripe from "stripe";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { Cron, CronExpression } from "@nestjs/schedule";

const cacheDataTtl = 1000 * 60 * 70;

@Injectable()
export class AnalyticsService {
    constructor(
        private prismaService: PrismaService,
        private httpService: HttpService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

    async onModuleInit() {
        Promise.all([this.refreshLootlabsCache(), this.refreshStripeCache()]);
    }

    private onlineUsers = new Map<string, number>();

    ping(ip: string) {
        this.onlineUsers.set(ip, Date.now());
    }

    getLiveCount() {
        return this.onlineUsers.size;
    }

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
        const stripeData = await this.stripeStatistics();
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

        return [...analytics, ...lootlabsData, ...stripeData];
    }

    async lootlabsStatistics(): Promise<AnalyticsDto[]> {
        return ((await this.cacheManager.get("lootlabs-data")) as AnalyticsDto[]) ?? [];
    }

    async stripeStatistics(): Promise<AnalyticsDto[]> {
        return ((await this.cacheManager.get("stripe-data")) as AnalyticsDto[]) ?? [];
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

    @Cron(CronExpression.EVERY_HOUR)
    async refreshLootlabsCache() {
        const token = process.env.MONETIZATION_API_KEY;
        const method = process.env.MONETIZATION_API_METHOD;

        if (!token || method !== "lootlabs") return;

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

            const lootlabsData = analytics.sort((a, b) => a.date.getTime() - b.date.getTime());
            await this.cacheManager.set("lootlabs-data", lootlabsData, cacheDataTtl);
        } catch (_) {
            /* empty */
        }
    }

    @Cron(CronExpression.EVERY_HOUR)
    async refreshStripeCache() {
        const token = process.env.STRIPE_SECRET_KEY;
        if (!token) return;

        try {
            const stripe = new Stripe(token);
            const analytics: AnalyticsDto[] = [];
            const groupedByDate = new Map<string, { revenue: number; purchases: number }>();

            for await (const payment of stripe.paymentIntents.list({ limit: 100 })) {
                if (payment.status !== "succeeded") continue;

                const date = dayjs.unix(payment.created).format("YYYY-MM-DD");
                if (!groupedByDate.has(date)) groupedByDate.set(date, { revenue: 0, purchases: 0 });

                const entry = groupedByDate.get(date)!;
                entry.revenue += payment.amount_received / 100;
                entry.purchases += 1;
            }

            for (const [date, { revenue, purchases }] of groupedByDate.entries()) {
                analytics.push({
                    id: createId(),
                    type: "general",
                    date: dayjs(date).toDate(),
                    name: AnalyticsNames.stripeRevenue,
                    value: parseFloat(revenue.toFixed(2)),
                });
                analytics.push({
                    id: createId(),
                    type: "general",
                    date: dayjs(date).toDate(),
                    name: AnalyticsNames.stripePurchases,
                    value: purchases,
                });
            }

            const stripeData = analytics.sort((a, b) => a.date.getTime() - b.date.getTime());
            await this.cacheManager.set("stripe-data", stripeData, cacheDataTtl);
        } catch (_) {
            /* empty */
        }
    }

    @Cron(CronExpression.EVERY_MINUTE)
    evictStaleUsers() {
        const ttl = 2 * 60 * 1000;
        const now = Date.now();
        for (const [ip, lastSeen] of this.onlineUsers) {
            if (now - lastSeen > ttl) this.onlineUsers.delete(ip);
        }
    }
}
