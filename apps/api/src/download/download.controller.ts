import { Controller, Get, Param, ParseIntPipe, Post, Query } from "@nestjs/common";
import { DownloadService } from "src/download/download.service";
import { GenerateDownloadDto } from "src/download/dto/generate-download.dto";

@Controller("download")
export class DownloadController {
    constructor(private downloadService: DownloadService) {}

    @Get()
    async download(@Param("id", ParseIntPipe) id: number): Promise<string> {
        console.log(id);
        return "";
    }

    @Get("verify")
    async verify(): Promise<string> {
        return "";
    }

    @Post("generate")
    async generate(@Query() query: GenerateDownloadDto): Promise<string> {
        this.downloadService.download(query);
        return "Generating download for this file: " + query.file;
    }
}
