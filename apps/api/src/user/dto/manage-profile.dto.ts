import { PickType } from "@nestjs/swagger";
import { UserDto } from "~/user/dto/user.dto";

export class ManageProfileDto extends PickType(UserDto, [
    "bio",
    "name",
    "linkvertiseId",
    "linkvertiseSecret",
    "lootlabsSecret",
    "lootlabsLinkId",
    "monetizationType",
    "banned",
] as const) {}
