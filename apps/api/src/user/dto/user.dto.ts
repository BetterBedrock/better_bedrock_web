import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsOptional, IsString } from "class-validator";

export class UserDto {
    @IsString()
    id: string;

    @IsString()
    googleId: string;

    @IsString()
    email: string;

    @IsString()
    name: string;

    @IsBoolean()
    admin: boolean;

    @IsString()
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
    linkvertiseId: string | null;

    @IsString()
    @IsOptional()
    linkvertiseSecret: string | null;
}
