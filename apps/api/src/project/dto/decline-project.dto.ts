import { PickType } from "@nestjs/swagger";
import { ProjectDto } from "~/project/dto/project.dto";

export class DeclineProjectDto extends PickType(ProjectDto, ["error"] as const) {}
