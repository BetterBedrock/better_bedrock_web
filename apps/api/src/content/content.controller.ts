import { Controller, Get } from "@nestjs/common";
import { ApiTags, ApiOkResponse } from "@nestjs/swagger";
import { DOWNLOADS_LIST } from "src/content/constants/content-downloads";
import { SIDE_PROJECTS_LIST } from "src/content/constants/content-side-projects";
import { THEMES_LIST } from "src/content/constants/content-themes";
import { DownloadsListDto } from "src/content/dto/downloads.dto";
import { SideProjectDto } from "src/content/dto/side-projects.dto";
import { ThemeDto } from "src/content/dto/theme.dto";

@ApiTags("content")
@Controller("content")
export class ContentController {
    @Get("downloads")
    @ApiOkResponse({
        description: "List of available downloads",
        type: DownloadsListDto,
        schema: { example: DOWNLOADS_LIST },
    })
    downloads(): DownloadsListDto[] {
        return DOWNLOADS_LIST;
    }

    @Get("side-projects")
    @ApiOkResponse({
        description: "List of side projects",
        type: SideProjectDto,
        schema: { example: SIDE_PROJECTS_LIST },
    })
    sideProjects(): SideProjectDto[] {
        return SIDE_PROJECTS_LIST;
    }

    @Get("themes")
    @ApiOkResponse({
        description: "List of available themes",
        type: ThemeDto,
        schema: { example: THEMES_LIST },
    })
    themes(): ThemeDto[] {
        return THEMES_LIST;
    }
}
