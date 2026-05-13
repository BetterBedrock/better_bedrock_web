import { IsOptional, IsString, Length } from "class-validator";

export class PingDto {
    @IsString()
    @IsOptional()
    @Length(36, 36)
    id?: string;
}
