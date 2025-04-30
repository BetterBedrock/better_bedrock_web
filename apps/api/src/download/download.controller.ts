import {
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Ip,
    NotFoundException,
    Post,
    Query,
    StreamableFile,
} from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { createReadStream } from "fs";
import { AnalyticsService } from "src/analytics/analytics.service";
import { DownloadService } from "src/download/download.service";
import { GenerateDownloadDto } from "src/download/dto/generate-download.dto";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";
import { VerifyDownloadDto } from "src/download/dto/verify-download.dto";
import { DOWNLOADS_LIST, DownloadsItemProps } from "src/content/constants/content-downloads";

@Controller("download")
export class DownloadController {
    private readonly linkvertiseApiKey = process.env.LINKVERTISE_API_KEY;

    constructor(
        private readonly http: HttpService,
        private downloadService: DownloadService,
        private analyticsService: AnalyticsService,
    ) {}

    @Get()
    async download(@Ip() ip): Promise<StreamableFile> {
        const download = await this.downloadService.download({ ipAddress: ip });
        if (!download?.verified) {
            throw new HttpException(
                "You have not verified your download yet.",
                HttpStatus.UNAUTHORIZED,
            );
        }

        const registryElement = this.findDownloadItemById(download.file);

        if (!registryElement) {
            throw new HttpException(
                "This file does not exist anymore on our servers.",
                HttpStatus.NOT_FOUND,
            );
        }

        // Update analytics
        const analytics = await this.analyticsService.analytics();
        if (analytics) {
            const filesCount = (analytics.fileCounts as Record<string, number>) || {};

            filesCount[download.file] = (filesCount[download.file] ?? 0) + 1;

            analytics.verifiedDownloads++;
            analytics.fileCounts = filesCount;

            await this.analyticsService.updateAnalytics({
                totalDownloads: analytics.totalDownloads,
                fileCounts: analytics.fileCounts,
            });
        }

        const fileStream = createReadStream(`src/assets/downloads/${registryElement.downloadId}`);

        return new StreamableFile(fileStream);
    }

    @Post("verify")
    async verify(@Ip() ip: string, @Query() query: VerifyDownloadDto): Promise<string> {
        const url = `https://publisher.linkvertise.com/api/v1/anti_bypassing?token=${this.linkvertiseApiKey}&hash=${query.hash}`;

        try {
            const response$ = this.http.post(
                url,
                {}, // no body
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "POST",
                        "Access-Control-Allow-Headers": "Content-Type, Authorization",
                    },
                },
            );
            const { data, status } = await lastValueFrom(response$);

            if (status !== 200 || !data.success) {
                throw new HttpException("Linkvertise verification failed", HttpStatus.BAD_GATEWAY);
            }
        } catch (err) {
            if (err instanceof HttpException) {
                throw err;
            }

            throw new HttpException(
                "Linkvertise servers are currently down, please wait before next request.",
                HttpStatus.SERVICE_UNAVAILABLE,
            );
        }

        await this.downloadService.updateDownload({
            where: { ipAddress: ip },
            data: { verified: true },
        });

        return "Verified successfully";
    }

    @ApiResponse({ status: 201, description: "The record has been successfully created." })
    @ApiResponse({ status: 403, description: "Forbidden." })
    @Post("generate")
    async generate(@Ip() ip, @Query() query: GenerateDownloadDto): Promise<string> {
        this.findDownloadItemById(query.file);

        await this.downloadService.deleteDownload({ ipAddress: ip });
        await this.downloadService.createDownload({
            ipAddress: ip,
            file: query.file,
        });

        // Update analytics
        const analytics = await this.analyticsService.analytics();
        if (analytics) {
            await this.analyticsService.updateAnalytics({
                totalDownloads: analytics.totalDownloads++,
            });
        }

        return `Generating download ${ip} for this file: ` + query.file;
    }

    findDownloadItemById(downloadId: string): DownloadsItemProps | undefined {
        for (const section of DOWNLOADS_LIST) {
            const match = section.items.find((item) => item.downloadId === downloadId);
            if (match) {
                return match;
            }
        }

        throw new NotFoundException(`Download "${downloadId}" not found.`);
    }
}
