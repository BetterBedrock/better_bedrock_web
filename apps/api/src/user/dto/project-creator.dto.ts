import { PickType } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { UserDto } from "~/user/dto/user.dto";

export class ProjectCreatorDto extends PickType(UserDto, ["name"] as const) {
    @IsNumber()
    rating: number;
}
