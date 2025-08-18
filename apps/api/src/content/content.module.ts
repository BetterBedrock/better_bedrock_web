import { Module } from "@nestjs/common";
import { AnalyticsService } from "~/analytics/analytics.service";
import { ContentController } from "~/content/content.controller";
import { PrismaService } from "~/prisma.service";
import { ProjectService } from "~/project/project.service";

@Module({
    controllers: [ContentController],
    providers: [AnalyticsService, PrismaService, ProjectService],
})
export class ContentModule {}
