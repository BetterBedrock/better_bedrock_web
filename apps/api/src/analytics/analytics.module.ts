import { Module } from "@nestjs/common";
import { PrismaService } from "~/prisma.service";
import { AnalyticsService } from "~/analytics/analytics.service";
import { AnalyticsController } from "~/analytics/analytics.controller";

@Module({
    controllers: [AnalyticsController],
    providers: [AnalyticsService, PrismaService],
})
export class AnalyticsModule {}
