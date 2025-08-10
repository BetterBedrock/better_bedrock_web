import { DownloadsButtonDto } from "~/download/dto/downloads-button.dto";
import { DownloadsItemDto } from "~/download/dto/downloads-item.dto";

export class DownloadsListDto {
    /**
     * Title of the list
     * @example 'Featured'
     */
    title: string;

    /**
     * Description of the list
     * @example 'Our latest texture pack'
     */
    description: string;

    buttons?: DownloadsButtonDto[];
    items: DownloadsItemDto[];
}
