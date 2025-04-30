import { Controller, Get } from "@nestjs/common";
import { DOWNLOADS_LIST } from "src/content/constants/content-downloads";
import { SIDE_PROJECTS_LIST } from "src/content/constants/content-side-projects";
import { THEMES_LIST } from "src/content/constants/content-themes";

@Controller("content")
export class ContentController {
    @Get("downloads")
    downloads() {
        return DOWNLOADS_LIST;
    }

    @Get("side-projects")
    sideProjects() {
        return SIDE_PROJECTS_LIST;
    }

    @Get("themes")
    themes() {
        return THEMES_LIST;
    }
}
