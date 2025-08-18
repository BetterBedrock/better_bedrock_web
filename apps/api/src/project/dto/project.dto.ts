import { ApiProperty } from "@nestjs/swagger";
import { ProjectType } from "@prisma/client";
import { Type } from "class-transformer";
import { IsDate } from "class-validator";

export class ProjectDto {
    id: string;
    title: string;
    description: string;
    itemWeight: number;
    betterBedrockContent: boolean;
    verified: boolean;

    @IsDate()
    @Type(() => Date)
    lastChanged: Date;

    @IsDate()
    @Type(() => Date)
    createdAt: Date;

    tags: string[];

    @ApiProperty({ enum: ProjectType, enumName: "ProjectType" })
    type: ProjectType;

    userId: string;
}
