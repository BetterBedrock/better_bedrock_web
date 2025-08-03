import { Module } from "@nestjs/common";
import { AnalyticsService } from "src/analytics/analytics.service";
import { ContentController } from "src/content/content.controller";
import { PrismaService } from "src/prisma.service";

@Module({
    controllers: [ContentController],
    providers: [AnalyticsService, PrismaService],
})
export class ContentModule {}
