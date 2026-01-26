import { IsString } from "class-validator";

export class GenerateDownloadResponseDto {
    /**
     * URL to where user should be redirected to
     * @example 'https://betterbedrock.com'
     */
    @IsString()
    url: string;
}
