import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { AnalyticsService } from "src/analytics/analytics.service";
import { AnalyticsController } from "src/analytics/analytics.controller";

@Module({
    controllers: [AnalyticsController],
    providers: [AnalyticsService, PrismaService],
})
export class AnalyticsModule {}
