import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class SearchProjectsQueryDto {
    @IsOptional()
    @IsString()
    type?: string;

    @IsOptional()
    @IsString()
    text?: string;

    @IsOptional()
    @Type(() => Number) // ensures query params are parsed as numbers
    @IsNumber()
    page?: number = 1;
}
