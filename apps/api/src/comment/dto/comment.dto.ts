import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsOptional, IsString } from "class-validator";

export class CommentDto {
    @IsString()
    id: string;

    @IsString()
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
