import { ApiProperty } from "@nestjs/swagger";
import { ProjectType } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";
import { Type } from "class-transformer";
import {
    IsBoolean,
    IsDate,
    IsNumber,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
} from "class-validator";
import { TagNameDto } from "~/project/dto/tag-name.dto";

export class ProjectDto {
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    title: string;

    @IsString()
    id: string;

    @IsBoolean()
    draft: boolean;
    @IsBoolean()
    submitted: boolean;

    @ApiProperty({ type: "object", nullable: true, additionalProperties: true })
    description: JsonValue;

    @IsNumber()
    itemWeight: number;
    @IsBoolean()
    betterBedrockContent: boolean;

    @IsDate()
    @Type(() => Date)
    lastChanged: Date;

    @IsDate()
    @Type(() => Date)
    createdAt: Date;

    @IsString()
    @IsOptional()
    error: string | null;

    @IsString()
    @IsOptional()
    thumbnail: string | null;

    @IsString()
    @IsOptional()
    downloadFile: string | null;

    tags: TagNameDto[];

    @ApiProperty({ enum: ProjectType, enumName: "ProjectType" })
    type: ProjectType;

    @IsString()
    userId: string;
}
