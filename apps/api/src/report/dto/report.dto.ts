import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsOptional, IsString } from "class-validator";

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
