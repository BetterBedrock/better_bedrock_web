import { DownloadsItemDto } from "@/shared/config/dto/downloads-item.dto";

export interface DownloadsListDto {
    title: string;
    description: string;
    items: DownloadsItemDto[];
}
