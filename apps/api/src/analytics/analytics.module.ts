import { Module } from "@nestjs/common";
import { PrismaService } from "~/prisma.service";
import { AnalyticsService } from "~/analytics/analytics.service";
import { AnalyticsController } from "~/analytics/analytics.controller";
import { ProjectService } from "~/project/project.service";

@Module({
    controllers: [AnalyticsController],
    providers: [AnalyticsService, PrismaService, ProjectService],
})
export class AnalyticsModule {}
