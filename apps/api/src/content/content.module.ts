import { Module } from "@nestjs/common";
import { AnalyticsService } from "~/analytics/analytics.service";
import { ContentController } from "~/content/content.controller";
import { PrismaService } from "~/prisma.service";

@Module({
    controllers: [ContentController],
    providers: [AnalyticsService, PrismaService],
})
export class ContentModule {}
