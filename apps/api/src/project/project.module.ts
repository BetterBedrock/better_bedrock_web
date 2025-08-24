import { Module } from "@nestjs/common";
import { ProjectService } from "./project.service";
import { ProjectController } from "./project.controller";
import { PrismaService } from "~/prisma.service";
import { RatingService } from "~/rating/rating.service";
import { CommentService } from "~/comment/comment.service";

@Module({
    controllers: [ProjectController],
    providers: [ProjectService, PrismaService, RatingService, CommentService],
})
export class ProjectModule {}
