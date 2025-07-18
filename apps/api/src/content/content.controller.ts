import { Controller, Get } from "@nestjs/common";
import { ApiTags, ApiOkResponse } from "@nestjs/swagger";
import { DOWNLOADS_LIST } from "src/content/constants/content-downloads";
import { SIDE_PROJECTS_LIST } from "src/content/constants/content-side-projects";
import { COMMUNITY_LIST } from "src/content/constants/content-community";
import { DownloadsDto } from "src/download/dto/downloads.dto";

@ApiTags("content")
@Controller("content")
export class ContentController {
    @Get("downloads")
    @ApiOkResponse({
        description: "List of available downloads",
        type: DownloadsDto,
        schema: { example: DOWNLOADS_LIST },
    })
    downloads(): DownloadsDto {
        return {
            community: COMMUNITY_LIST,
            sideProjects: SIDE_PROJECTS_LIST,
            main: DOWNLOADS_LIST,
        };
    }
}
