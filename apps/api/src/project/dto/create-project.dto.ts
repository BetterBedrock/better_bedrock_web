import { PickType } from "@nestjs/swagger";
import { ProjectDto } from "~/project/dto/project.dto";

export class CreateProjectDto extends PickType(ProjectDto, [
    "id",
    "title",
    "description",
    "mainFile",
    "files",
    "tags",
    "type",
] as const) {}
