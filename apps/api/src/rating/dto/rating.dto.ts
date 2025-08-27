import { Type } from "class-transformer";
import { IsDate, IsInt, IsString, Max, Min } from "class-validator";

export class RatingDto {
    @IsString()
    id: string;

    @Min(1)
    @Max(5)
    @IsInt()
    @Type(() => Number)
    rating: number;

    @IsString()
    userId: string;

    @IsString()
    projectId: string;

    @IsDate()
    @Type(() => Date)
    createdAt: Date;
}
