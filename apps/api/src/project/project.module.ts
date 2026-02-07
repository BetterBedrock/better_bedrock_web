import { Module } from "@nestjs/common";
import { ProjectService } from "./project.service";
import { ProjectController } from "./project.controller";
import { PrismaService } from "~/prisma.service";
import { RatingService } from "~/rating/rating.service";
import { CommentService } from "~/comment/comment.service";
import { AnalyticsService } from "~/analytics/analytics.service";
import { MailService } from "~/mail/mail.service";
import { UserService } from "~/user/user.service";
import { HttpModule } from "@nestjs/axios";

@Module({
    imports: [HttpModule],
    controllers: [ProjectController],
    providers: [
        ProjectService,
        PrismaService,
        RatingService,
        CommentService,
        AnalyticsService,
        MailService,
        UserService,
    ],
})
export class ProjectModule {}
