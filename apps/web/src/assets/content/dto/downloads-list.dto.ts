import { DownloadsItemDto } from "~/assets/content/dto/downloads-item.dto";

export interface DownloadsListDto {
    title: string;
    description: string;
    items: DownloadsItemDto[];
}
