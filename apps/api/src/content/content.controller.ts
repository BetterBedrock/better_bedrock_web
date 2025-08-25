import { Controller, Get } from "@nestjs/common";
import { ApiTags, ApiOkResponse } from "@nestjs/swagger";
import { DOWNLOADS_IDS, MAIN_LIST } from "~/content/constants/content-main";
import { SIDE_PROJECTS_LIST } from "~/content/constants/content-side-projects";
import { COMMUNITY_LIST } from "~/content/constants/content-community";
import { DownloadsDto } from "~/download/dto/downloads.dto";
import { AnalyticsService } from "~/analytics/analytics.service";
import { AnalyticsNames } from "~/analytics/constants/analytics-names";

@ApiTags("content")
@Controller("content")
export class ContentController {
    constructor(private readonly analyticsService: AnalyticsService) {}

    @Get("downloads")
    @ApiOkResponse({
        description: "List of available downloads",
        type: DownloadsDto,
        schema: {
            example: {
                default: MAIN_LIST.id,
                featured: DOWNLOADS_IDS.betterBedrockClientV81,
                categories: [MAIN_LIST, COMMUNITY_LIST, SIDE_PROJECTS_LIST],
            },
        },
    })
    async downloads(): Promise<DownloadsDto> {
        await this.analyticsService.incrementAnalytics(AnalyticsNames.visits, "general");
        return {
            default: MAIN_LIST.id,
            featured: DOWNLOADS_IDS.betterBedrockClientV81,
            categories: [MAIN_LIST, COMMUNITY_LIST, SIDE_PROJECTS_LIST],
        };
    }
}
