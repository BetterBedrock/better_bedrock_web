import { SimpleProjectDto } from "@/shared/lib/openapi";
import { DownloadsItemDto } from "@/shared/config/dto/downloads-item.dto";
import { DownloadsListDto } from "@/shared/config/dto/downloads-list.dto";

export interface SimpleCategory extends Omit<DownloadsListDto, "items"> {
    items: SimpleProjectDto[];
    categoryItems: DownloadsItemDto[];
}
