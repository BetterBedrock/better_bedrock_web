import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CommentDto {
    @IsString()
    id: string;

    @IsString()
    @MinLength(0)
    @MaxLength(200)
    content: string;

    @IsString()
    authorId: string;

    @IsString()
    projectId: string;

    @IsString()
    @IsOptional()
    parentId: string | null;

    @IsBoolean()
    pinned: boolean;

    @IsDate()
    @Type(() => Date)
    createdAt: Date;

    @IsBoolean()
    deleted: boolean;

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    deletedAt: Date | null;
}
