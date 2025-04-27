import { IsString } from "class-validator";

export class GenerateDownloadDto {
    /**
     * Name of the file user wants to generate download for
     * @example 'better-bedrock.txt'
     */
    @IsString()
    file: string;
}
