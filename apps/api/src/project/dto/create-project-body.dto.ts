import { PickType } from "@nestjs/swagger";
import { ProjectDto } from "~/project/dto/project.dto";

export class CreateProjectBodyDto extends PickType(ProjectDto, ["title"] as const) {}
