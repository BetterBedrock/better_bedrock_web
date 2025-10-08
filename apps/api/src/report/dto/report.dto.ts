import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class ReportDto {
    @IsString()
    id: string;

    @IsString()
    reporterId: string;

    @IsString()
    @IsOptional()
    reportedUserId: string | null;

    @IsString()
    @IsOptional()
    reportedProjectId: string | null;

    @IsString()
    @MinLength(3)
    @MaxLength(200)
    message: string;

    @IsBoolean()
    resolved: boolean;

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    resolvedAt: Date | null;

    @IsDate()
    @Type(() => Date)
    createdAt: Date;
}
