import { DownloadsListDto } from "@/shared/config/dto/downloads-list.dto";

export interface DownloadsCategoryDto {
    id: string;
    name: string;
    lists: DownloadsListDto[];
}
