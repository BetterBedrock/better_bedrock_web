import { Injectable } from "@nestjs/common";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { PrismaService } from "~/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class ProjectService {
    constructor(private readonly prismaService: PrismaService) {}
    async create(data: Prisma.ProjectCreateInput) {
        return await this.prismaService.project.create({ data: data });
    }

    findAll() {
        return `This action returns all project`;
    }

    findOne(id: number) {
        return `This action returns a #${id} project`;
    }

    update(id: number, _updateProjectDto: UpdateProjectDto) {
        return `This action updates a #${id} project`;
    }

    remove(id: number) {
        return `This action removes a #${id} project`;
    }
}
