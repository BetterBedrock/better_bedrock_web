import { IsBoolean, IsOptional } from "class-validator";

export class PublishProjectDto {
    @IsBoolean()
    @IsOptional()
    notify?: boolean;

    @IsBoolean()
    @IsOptional()
    updateLastChanged?: boolean;
}
