import { DownloadsCategoryDto } from "src/download/dto/downloads-category.dto";

export class DownloadsDto {
    default: string;
    featured: string;
    categories: DownloadsCategoryDto[];
}
