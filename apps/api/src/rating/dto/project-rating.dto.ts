import { IsNumber } from "class-validator";

export class ProjectRatingDto {
    @IsNumber()
    average: number;

    @IsNumber()
    count: number;
}
