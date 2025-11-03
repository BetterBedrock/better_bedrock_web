import { ApiProperty } from "@nestjs/swagger";
import { ProjectType } from "@prisma/client";
import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
import { SearchOrder } from "~/project/dto/search-order.dto";

export class SearchProjectsQueryDto {
    @IsOptional()
    @IsEnum(ProjectType)
    @ApiProperty({ enum: ProjectType, enumName: "ProjectType" })
    type?: ProjectType;

    @IsOptional()
    @IsEnum(SearchOrder)
    @ApiProperty({ enum: SearchOrder, enumName: "SearchOrder" })
    order?: SearchOrder;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    text?: string;

    @IsOptional()
    @Type(() => Number) // ensures query params are parsed as numbers
    @IsNumber()
    page?: number = 1;
}
