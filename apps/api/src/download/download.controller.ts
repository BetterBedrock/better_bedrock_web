import {
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Ip,
    NotFoundException,
    Post,
    Query,
    Res,
    StreamableFile,
} from "@nestjs/common";
import {
    ApiBadGatewayResponse,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiProduces,
    ApiQuery,
    ApiServiceUnavailableResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { AnalyticsService } from "src/analytics/analytics.service";
import { Response } from "express";
import { DownloadService } from "src/download/download.service";
import { GenerateDownloadDto } from "src/download/dto/generate-download.dto";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";
import { VerifyDownloadDto } from "src/download/dto/verify-download.dto";
import { DOWNLOADS_LIST } from "src/content/constants/content-downloads";
import { createReadStream, promises as fs } from "fs";
import { join } from "path";
import { DownloadsItemDto } from "@better-bedrock/constants/downloads.dto";

@ApiTags("download")
@Controller("download")
export class DownloadController {
    private readonly linkvertiseApiKey = process.env.LINKVERTISE_API_KEY;

    constructor(
        private readonly http: HttpService,
        private downloadService: DownloadService,
        private analyticsService: AnalyticsService,
    ) {}

    @Get()
    @ApiOkResponse({
        description: "Binary file stream",
        schema: { type: "string", format: "binary" },
    })
    @ApiProduces("application/octet-stream")
    @ApiUnauthorizedResponse({ description: "Not verified for download." })
    @ApiNotFoundResponse({ description: "File not found or does not exist on server." })
    async download(@Ip() ip, @Res({ passthrough: true }) res: Response): Promise<StreamableFile> {
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

        const filePath = join(
            __dirname,
            "../..",
            "src/assets/downloads",
            registryElement.downloadId,
        );

        let stat;
        try {
            stat = await fs.stat(filePath);
        } catch (_) {
            throw new HttpException("File not found.", HttpStatus.NOT_FOUND);
        }
        const fileSize = stat.size;

        const fileStream = createReadStream(`src/assets/downloads/${registryElement.downloadId}`);

        res.setHeader("Access-Control-Expose-Headers", "Content-Disposition, Content-Length");
        res.set({
            "Content-Type": "application/octet-stream",
            "Content-Disposition": `attachment; filename="${download.file}"`,
            "Content-Length": fileSize.toString(),
        });
        return new StreamableFile(fileStream);
    }

    @Post("verify")
    @ApiQuery({
        name: "hash",
        type: "string",
        description: "Linkvertise anti-bypass hash",
        required: true,
    })
    @ApiOkResponse({ type: DownloadsItemDto, description: "Download verified successfully." })
    @ApiNotFoundResponse({
        description: "Download record not found for this IP or file not found.",
    })
    @ApiBadGatewayResponse({ description: "Failed to verify with Linkvertise gateway." })
    @ApiServiceUnavailableResponse({ description: "Linkvertise service unavailable." })
    async verify(
        @Ip() ip: string,
        @Query() query: VerifyDownloadDto,
    ): Promise<DownloadsItemDto | undefined> {
        const download = await this.downloadService.download({ ipAddress: ip });

        if (!download) {
            throw new NotFoundException(`Download for your device could not be found.`);
        }

        const url = `https://publisher.linkvertise.com/api/v1/anti_bypassing?token=${this.linkvertiseApiKey}&hash=${query.hash}`;

        if (!download.verified) {
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

                if (status !== 200 || !data.status) {
                    throw new HttpException(
                        "Failed to verify with Linkvertise gateway.",
                        HttpStatus.BAD_GATEWAY,
                    );
                }
            } catch (err) {
                if (err instanceof HttpException) {
                    throw err;
                }

                throw new HttpException(
                    "Linkvertise service unavailable.",
                    HttpStatus.SERVICE_UNAVAILABLE,
                );
            }

            await this.downloadService.updateDownload({
                where: { ipAddress: ip },
                data: { verified: true },
            });
        }

        return this.findDownloadItemById(download.file);
    }

    @Post("generate")
    @ApiQuery({
        name: "file",
        type: "string",
        description: "Download ID to generate",
        required: true,
    })
    @ApiCreatedResponse({ description: "Download record created." })
    @ApiNotFoundResponse({ description: "Requested file not found." })
    async generate(@Ip() ip, @Query() query: GenerateDownloadDto) {
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
    }

    findDownloadItemById(downloadId: string): DownloadsItemDto | undefined {
        for (const section of DOWNLOADS_LIST) {
            const match = section.items.find((item) => item.downloadId === downloadId);
            if (match) {
                return match;
            }
        }

        throw new NotFoundException(`Download "${downloadId}" not found.`);
    }
}
