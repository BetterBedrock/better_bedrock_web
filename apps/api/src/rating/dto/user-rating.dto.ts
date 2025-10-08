import { IsNumber } from "class-validator";

export class UserRatingDto {
    @IsNumber()
    average: number;

    @IsNumber()
    count: number;
}
