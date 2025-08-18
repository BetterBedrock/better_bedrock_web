import { IntersectionType, PickType } from "@nestjs/swagger";
import { ProjectDto } from "~/project/dto/project.dto";
import { UserNameDto } from "~/user/dto/user-name.dto";

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
    ] as const),
) {
    user: UserNameDto;
}
