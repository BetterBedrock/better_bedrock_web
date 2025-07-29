import { Controller, Get } from "@nestjs/common";
import { ApiTags, ApiOkResponse } from "@nestjs/swagger";
import { MAIN_LIST } from "src/content/constants/content-main";
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
        schema: {
            example: {
                default: MAIN_LIST.id,
                categories: [MAIN_LIST, COMMUNITY_LIST, SIDE_PROJECTS_LIST],
            },
        },
    })
    downloads(): DownloadsDto {
        return {
            default: MAIN_LIST.id,
            categories: [MAIN_LIST, COMMUNITY_LIST, SIDE_PROJECTS_LIST],
        };
    }
}
