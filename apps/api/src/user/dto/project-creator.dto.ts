import { PickType } from "@nestjs/swagger";
import { IsNumber, Max, Min } from "class-validator";
import { UserDto } from "~/user/dto/user.dto";

export class ProjectCreatorDto extends PickType(UserDto, ["name"] as const) {
    @IsNumber()
    @Min(0)
    @Max(5)
    rating: number;
}
