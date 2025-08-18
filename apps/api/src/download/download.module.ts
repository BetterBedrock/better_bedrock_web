import { Module } from "@nestjs/common";
import { AnalyticsService } from "~/analytics/analytics.service";
import { DownloadController } from "~/download/download.controller";
import { DownloadService } from "~/download/download.service";
import { PrismaService } from "~/prisma.service";
import { HttpModule } from "@nestjs/axios";
import { VoucherService } from "~/voucher/voucher.service";
import { ProjectService } from "~/project/project.service";

@Module({
    imports: [
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5,
        }),
    ],
    controllers: [DownloadController],
    providers: [PrismaService, AnalyticsService, DownloadService, VoucherService, ProjectService],
})
export class DownloadModule {}
