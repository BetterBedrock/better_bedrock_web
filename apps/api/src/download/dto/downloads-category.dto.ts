import { DownloadsListDto } from "src/download/dto/downloads-list.dto";

export class DownloadsCategoryDto {
    /**
     * Id of the category (also used in url as a way to determine which category to open)
     * @example 'sideProjects'
     */
    id: string;

    /**
     * Name of the category
     * @example 'Side Projects'
     */
    name: string;
    lists: DownloadsListDto[];
}
