import { PickType } from "@nestjs/swagger";
import { ProjectDto } from "~/project/dto/project.dto";
import { UserNameDto } from "~/user/dto/user-name.dto";

export class BaseProjectDto extends PickType(ProjectDto, [
    "id",
    "title",
    "thumbnail",
    "tags",
    "type",
    "lastChanged",
    "betterBedrockContent",
    "draft",
    "userId",
] as const) {
    user: UserNameDto;
}
