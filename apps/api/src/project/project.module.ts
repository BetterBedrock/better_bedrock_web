import { Module } from "@nestjs/common";
import { ProjectService } from "./project.service";
import { ProjectController } from "./project.controller";
import { PrismaService } from "~/prisma.service";

@Module({
    controllers: [ProjectController],
    providers: [ProjectService, PrismaService],
})
export class ProjectModule {}
