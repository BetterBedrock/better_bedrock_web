import { ApiProperty } from "@nestjs/swagger";
import { ProjectType } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";
import { Type } from "class-transformer";
import {
    ArrayMaxSize,
    IsArray,
    IsBoolean,
    IsDate,
    IsNumber,
    IsOptional,
    IsString,
    Matches,
    MaxLength,
    MinLength,
    ValidateNested,
} from "class-validator";
import { TagNameDto } from "~/project/dto/tag-name.dto";

export class ProjectDto {
    @IsString()
    @Matches(/^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/, {
        message: "Only letters/numbers with single spaces between words allowed",
    })
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

    @IsArray()
    @ArrayMaxSize(5, { message: "A project can have at most 5 tags" })
    @ValidateNested({ each: true })
    @Type(() => TagNameDto)
    tags: TagNameDto[];

    @ApiProperty({ enum: ProjectType, enumName: "ProjectType" })
    type: ProjectType;

    @IsString()
    userId: string;
}
