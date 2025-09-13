import { IntersectionType, PickType } from "@nestjs/swagger";
import { ProjectDetailsDto } from "~/project/dto/project-details.dto";
import { ProjectDto } from "~/project/dto/project.dto";

export class SimpleProjectDto extends IntersectionType(
    PickType(ProjectDto, [
        "id",
        "title",
        "thumbnail",
        "tags",
        "type",
        "lastChanged",
        "betterBedrockContent",
        "draft",
        "userId",
        "itemWeight",
    ] as const),
    ProjectDetailsDto,
) {}
