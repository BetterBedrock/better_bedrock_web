import { Injectable } from "@nestjs/common";
import { AnalyticsType } from "@prisma/client";
import dayjs from "dayjs";
import { PrismaService } from "~/prisma.service";

@Injectable()
export class AnalyticsService {
    constructor(private prisma: PrismaService) {}

    async analytics() {
        return this.prisma.analytics.findMany();
    }

    async incrementAnalytics(name: string, type: AnalyticsType) {
        const today = dayjs().toISOString();

        return this.prisma.analytics.upsert({
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
