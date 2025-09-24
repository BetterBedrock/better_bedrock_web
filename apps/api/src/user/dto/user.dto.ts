import { Type } from "class-transformer";
import {
    IsBoolean,
    IsDate,
    IsEmail,
    IsOptional,
    IsString,
    Length,
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

    @IsBoolean()
    customLinkvertise: boolean;

    @IsString()
    @IsOptional()
    @MaxLength(10)
    linkvertiseId: string | null;

    @IsString()
    @IsOptional()
    @Length(64, 64)
    linkvertiseSecret: string | null;
}
