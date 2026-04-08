import { ApiProperty } from "@nestjs/swagger";
import { BannerVariant } from "@prisma/client";
import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsEnum, IsOptional, IsString } from "class-validator";

export class SettingsDto {
    @IsBoolean()
    banner: boolean;

    @IsString()
    bannerText: string;

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    bannerExpirationDate: Date | null;

    @IsEnum(BannerVariant)
    @ApiProperty({ enum: BannerVariant, enumName: "BannerVariant", example: BannerVariant.neutral })
    bannerVariant: BannerVariant;
}
