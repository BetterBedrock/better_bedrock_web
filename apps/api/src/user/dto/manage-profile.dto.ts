import { PickType } from "@nestjs/swagger";
import { UserDto } from "~/user/dto/user.dto";

export class ManageProfileDto extends PickType(UserDto, [
    "bio",
    "name",
    "linkvertiseId",
    "linkvertiseSecret",
    "customLinkvertise",
    "banned",
] as const) {}
