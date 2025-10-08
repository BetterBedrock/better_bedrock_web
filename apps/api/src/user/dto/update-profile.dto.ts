import { PickType } from "@nestjs/swagger";
import { UserDto } from "~/user/dto/user.dto";

export class UpdateProfileDto extends PickType(UserDto, [
    "bio",
    "name",
    "linkvertiseId",
    "linkvertiseSecret",
    "customLinkvertise",
] as const) {}
