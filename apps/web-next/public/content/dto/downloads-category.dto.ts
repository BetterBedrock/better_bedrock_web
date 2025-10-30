import { DownloadsListDto } from "@/public/content/dto/downloads-list.dto";

export interface DownloadsCategoryDto {
    id: string;
    name: string;
    lists: DownloadsListDto[];
}
