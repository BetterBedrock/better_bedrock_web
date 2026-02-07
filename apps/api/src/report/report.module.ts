import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { AnalyticsService } from "~/analytics/analytics.service";
import { PrismaService } from "~/prisma.service";
import { ProjectService } from "~/project/project.service";
import { RatingService } from "~/rating/rating.service";
import { ReportController } from "~/report/report.controller";
import { ReportService } from "~/report/report.service";
import { UserService } from "~/user/user.service";

@Module({
    imports: [HttpModule],
    controllers: [ReportController],
    providers: [
        ProjectService,
        PrismaService,
        ReportService,
        RatingService,
        UserService,
        AnalyticsService,
    ],
})
export class ReportModule {}
