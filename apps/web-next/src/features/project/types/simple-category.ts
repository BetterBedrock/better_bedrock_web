import { SimpleProjectDto } from "@/lib/api";
import { DownloadsItemDto } from "@/public/content/dto/downloads-item.dto";
import { DownloadsListDto } from "@/public/content/dto/downloads-list.dto";

export interface SimpleCategory extends Omit<DownloadsListDto, "items"> {
    items: SimpleProjectDto[];
    categoryItems: DownloadsItemDto[];
}