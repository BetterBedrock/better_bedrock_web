import { Module } from "@nestjs/common";
import { PrismaService } from "~/prisma.service";
import { AnalyticsService } from "~/analytics/analytics.service";
import { AnalyticsController } from "~/analytics/analytics.controller";
import { RatingService } from "~/rating/rating.service";

@Module({
    controllers: [AnalyticsController],
    providers: [AnalyticsService, PrismaService, RatingService],
})
export class AnalyticsModule {}
