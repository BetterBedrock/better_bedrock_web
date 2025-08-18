import { ApiProperty } from "@nestjs/swagger";
import { ProjectType } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";
import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class ProjectDto {
    @IsString()
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

    tags: string[];

    @ApiProperty({ enum: ProjectType, enumName: "ProjectType" })
    type: ProjectType;

    userId: string;
}
