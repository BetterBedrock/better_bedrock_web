import { IsString } from "class-validator";

export class GenerateDownloadDto {
    @IsString()
    file: string;
}
