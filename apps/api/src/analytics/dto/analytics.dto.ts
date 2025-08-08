import { ApiProperty } from "@nestjs/swagger";
import { AnalyticsType } from "@prisma/client";
import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNumber, IsString } from "class-validator";
import { AnalyticsNames } from "~/analytics/constants/analytics-names";

export class AnalyticsDto {
    /**
     * Unique identifier of the analytics entry
     * @example "cme0bzzxp000008l1bjjjbns4"
     */
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

    /**
     * The date when the analytics data was recorded
     * @example "2025-08-06"
     */
    @IsDate()
    @Type(() => Date)
    date: Date;

    /**
     * The numeric value associated with the analytics entry
     * @example 42
     */
    @IsNumber()
    value: number;
}
