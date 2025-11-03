import { DownloadsItemDto } from "@/public/content/dto/downloads-item.dto";

export interface DownloadsListDto {
    title: string;
    description: string;
    items: DownloadsItemDto[];
}
