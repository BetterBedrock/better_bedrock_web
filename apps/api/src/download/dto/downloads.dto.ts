import { DownloadsCategoryDto } from "~/download/dto/downloads-category.dto";

export class DownloadsDto {
    /**
     * Default section which will be opened on the website
     * @example 'main'
     */
    default: string;

    /**
     * Featured item on the website (an item after clicking which, user gets redirected to /latest)
     * @example 'better_bedrock_v8.mcpack'
     */
    featured: string;

    /**
     * Categories of downloads on the website
     */
    categories: DownloadsCategoryDto[];
}
