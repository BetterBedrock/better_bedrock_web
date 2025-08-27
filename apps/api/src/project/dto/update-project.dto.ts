import { PartialType, PickType } from "@nestjs/swagger";
import { ProjectDto } from "~/project/dto/project.dto";

export class UpdateProjectDto extends PartialType(
    PickType(ProjectDto, ["description", "type", "thumbnail", "tags"] as const),
) {}
