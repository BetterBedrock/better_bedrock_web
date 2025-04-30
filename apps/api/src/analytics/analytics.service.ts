import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class AnalyticsService {
    constructor(private prisma: PrismaService) {}

    async onModuleInit() {
        const existing = await this.prisma.analytics.findFirst({ where: { id: "global" } });
        if (!existing) {
            this.createAnalytics({ id: "global" });
        }
    }

    async analytics() {
        return this.prisma.analytics.findFirst({
            where: {
                id: "global",
            },
        });
    }

    async createAnalytics(data: Prisma.AnalyticsCreateInput) {
        return this.prisma.analytics.create({
            data,
        });
    }

    async updateAnalytics(data: Prisma.AnalyticsUpdateInput) {
        return this.prisma.analytics.update({
            where: {
                id: "global",
            },
            data: data,
        });
    }
}
