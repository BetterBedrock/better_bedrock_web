import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { SearchOrder } from "~/project/dto/search-order.dto";

export class SearchProjectsQueryDto {
    @IsOptional()
    @IsString()
    type?: string;

    @IsOptional()
    @IsEnum(SearchOrder)
    @ApiProperty({ enum: SearchOrder, enumName: "SearchOrder" })
    order?: SearchOrder;

    @IsOptional()
    @IsString()
    text?: string;

    @IsOptional()
    @Type(() => Number) // ensures query params are parsed as numbers
    @IsNumber()
    page?: number = 1;
}
