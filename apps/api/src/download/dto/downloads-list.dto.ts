import { DownloadsButtonDto } from "src/download/dto/downloads-button.dto";
import { DownloadsItemDto } from "src/download/dto/downloads-item.dto";

export class DownloadsListDto {
    /**
     * Title of the list
     * @example 'Featured'
     */
    title: string;

    /**
     * Description of the list
     * @example 'Our latest texturepack'
     */
    description: string;

    buttons?: DownloadsButtonDto[];
    items: DownloadsItemDto[];
}
