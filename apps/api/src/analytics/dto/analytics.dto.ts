import { ApiProperty } from "@nestjs/swagger";
import { AnalyticsType } from "@prisma/client";
import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNumber, IsString } from "class-validator";
import { AnalyticsNames } from "src/analytics/constants/analytics-names";

export class AnalyticsDto {
    id: string;

    @IsEnum(AnalyticsType)
    @ApiProperty({ enum: AnalyticsType, enumName: "AnalyticsType", example: AnalyticsType.file })
    type: AnalyticsType;

    @IsString()
    @IsEnum(AnalyticsNames)
    @ApiProperty({
        enum: AnalyticsNames,
        enumName: "AnalyticsNames",
        example: AnalyticsNames.visits,
    })
    name: string | AnalyticsNames;

    @IsDate()
    @Type(() => Date)
    date: Date;

    @IsNumber()
    value: number;
}
