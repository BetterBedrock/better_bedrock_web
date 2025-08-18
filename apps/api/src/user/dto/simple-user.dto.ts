import { OmitType } from "@nestjs/swagger";
import { UserDto } from "~/user/dto/user.dto";

export class SimpleUserDto extends OmitType(UserDto, [
    "linkvertiseId",
    "customLinkvertise",
    "linkvertiseSecret",
] as const) {}
