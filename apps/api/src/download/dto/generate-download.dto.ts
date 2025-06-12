import { IsOptional, IsString } from "class-validator";

export class GenerateDownloadDto {
    /**
     * Name of the file user wants to generate download for
     * @example 'better-bedrock.txt'
     */
    @IsString()
    file: string;

    /**
     * Code of the voucher user wants to use for download
     * @example '01975ae1-1ea7-7503-bc7b-bd51bf2a22af'
     */
    @IsString()
    @IsOptional()
    voucher?: string;
}
