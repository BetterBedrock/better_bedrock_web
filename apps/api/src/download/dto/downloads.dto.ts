import { DownloadsListDto } from "src/download/dto/downloads-list.dto";

export class DownloadsDto {
    main: DownloadsListDto[];
    community: DownloadsListDto[];
    sideProjects: DownloadsListDto[];
}
