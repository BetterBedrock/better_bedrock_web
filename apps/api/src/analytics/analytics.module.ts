import { Module } from "@nestjs/common";
import { PrismaService } from "~/prisma.service";
import { AnalyticsService } from "~/analytics/analytics.service";
import { AnalyticsController } from "~/analytics/analytics.controller";
import { RatingService } from "~/rating/rating.service";
import { HttpModule } from "@nestjs/axios";
import { CacheModule } from "@nestjs/cache-manager";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
    imports: [HttpModule, CacheModule.register(), ScheduleModule.forRoot()],
    controllers: [AnalyticsController],
    providers: [AnalyticsService, PrismaService, RatingService],
})
export class AnalyticsModule {}
