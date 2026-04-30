import { IsOptional, IsString, Length } from "class-validator";

export class PingDto {
    @IsString()
    @IsOptional()
    @Length(32, 32)
    id?: string;
}
