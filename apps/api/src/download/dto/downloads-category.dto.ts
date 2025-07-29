import { DownloadsListDto } from "src/download/dto/downloads-list.dto";

export class DownloadsCategoryDto {
    id: string;
    name: string;
    lists: DownloadsListDto[];
}
