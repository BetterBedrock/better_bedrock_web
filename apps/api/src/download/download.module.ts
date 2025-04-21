import { Module } from "@nestjs/common";
import { DownloadController } from "src/download/download.controller";
import { DownloadService } from "src/download/download.service";

@Module({
    controllers: [DownloadController],
    providers: [DownloadService],
})
export class DownloadModule {}
