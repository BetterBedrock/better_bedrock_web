import { Module } from "@nestjs/common";
import { AnalyticsService } from "src/analytics/analytics.service";
import { DownloadController } from "src/download/download.controller";
import { DownloadService } from "src/download/download.service";
import { PrismaService } from "src/prisma.service";
import { HttpModule } from "@nestjs/axios";

@Module({
    imports: [
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5,
        }),
    ],
    controllers: [DownloadController],
    providers: [PrismaService, AnalyticsService, DownloadService],
})
export class DownloadModule {}
