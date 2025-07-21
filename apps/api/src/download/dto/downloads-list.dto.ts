import { DownloadsButtonDto } from "src/download/dto/downloads-button.dto";
import { DownloadsItemDto } from "src/download/dto/downloads-item.dto";

export class DownloadsListDto {
    title: string;
    description: string;
    buttons?: DownloadsButtonDto[];
    items: DownloadsItemDto[];
}
