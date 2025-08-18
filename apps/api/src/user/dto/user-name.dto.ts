import { PickType } from "@nestjs/swagger";
import { UserDto } from "~/user/dto/user.dto";

export class UserNameDto extends PickType(UserDto, ["name"] as const) {}
