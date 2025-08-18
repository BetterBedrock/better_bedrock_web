import { PartialType, PickType } from "@nestjs/swagger";
import { ProjectDto } from "~/project/dto/project.dto";

export class UpdateProjectDto extends PartialType(
    PickType(ProjectDto, ["description", "type", "tags", "thumbnail"] as const),
) {}
