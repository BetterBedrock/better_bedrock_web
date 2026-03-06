import { ApiProperty } from "@nestjs/swagger";
import { MonetizationType } from "@prisma/client";
import { Type } from "class-transformer";
import {
    IsBoolean,
    IsDate,
    IsEmail,
    IsEnum,
    IsOptional,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from "class-validator";

export class UserDto {
    @IsString()
    id: string;

    @IsString()
    googleId: string;

    @IsEmail()
    email: string;

    @IsString()
    @Matches(/^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/, {
        message: "Only letters/numbers with single spaces between words allowed",
    })
    @MinLength(3)
    @MaxLength(20)
    name: string;

    @IsBoolean()
    admin: boolean;

    @IsString()
    @MaxLength(180)
    bio: string;

    @IsBoolean()
    banned: boolean;

    @IsDate()
    @Type(() => Date)
    createdAt: Date;

    @IsEnum(MonetizationType)
    @IsOptional()
    @ApiProperty({
        enum: MonetizationType,
        enumName: "MonetizationType",
        example: MonetizationType.linkvertise,
    })
    monetizationType: MonetizationType | null;

    @IsString()
    @IsOptional()
    @MaxLength(10)
    linkvertiseId: string | null;

    @IsString()
    @IsOptional()
    @MaxLength(64)
    linkvertiseSecret: string | null;

    @IsString()
    @IsOptional()
    @MaxLength(64)
    lootlabsSecret: string | null;

    @IsString()
    @IsOptional()
    @MaxLength(10)
    lootlabsLinkId: string | null;
}
