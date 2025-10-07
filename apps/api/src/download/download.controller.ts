import {
    Controller,
    ForbiddenException,
    Get,
    GoneException,
    HttpException,
    HttpStatus,
    Ip,
    NotFoundException,
    Post,
    Query,
    Req,
    Res,
    StreamableFile,
    UnauthorizedException,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiProduces } from "@nestjs/swagger";
import { AnalyticsService } from "~/analytics/analytics.service";
import { Response } from "express";
import { DownloadService } from "~/download/download.service";
import { GenerateDownloadDto } from "~/download/dto/generate-download.dto";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";
import { VerifyDownloadDto } from "~/download/dto/verify-download.dto";
import { createReadStream, promises as fs, Stats } from "fs";
import path from "path";
import { VoucherService } from "~/voucher/voucher.service";
import { SkipThrottle } from "@nestjs/throttler";
import { AnalyticsNames } from "~/analytics/constants/analytics-names";
import { ProjectService } from "~/project/project.service";
import { UserService } from "~/user/user.service";
import { OptionalAuthGuard } from "~/auth/optional-auth.guard";
import { ProjectDto } from "~/project/dto/project.dto";
import { OptionalAuthenticatedRequest } from "~/common/types/optional-authenticated-request.type";

@Controller("download")
export class DownloadController {
    private readonly linkvertiseApiKey = process.env.LINKVERTISE_API_KEY;

    constructor(
        private http: HttpService,
        private downloadService: DownloadService,
        private analyticsService: AnalyticsService,
        private voucherService: VoucherService,
        private projectService: ProjectService,
        private userService: UserService,
    ) {}

    @Get()
    @SkipThrottle()
    @ApiOkResponse({
        description: "Binary file stream",
        schema: { type: "string", format: "binary" },
    })
    @ApiProduces("application/octet-stream")
    async download(@Ip() ip, @Res({ passthrough: true }) res: Response): Promise<StreamableFile> {
        const download = await this.downloadService.download({ ipAddress: ip });

        if (!download) {
            throw new NotFoundException(`Download for your device could not be found`);
        }

        if (!download?.verified) {
            throw new UnauthorizedException("You have not verified your download yet.");
        }

        const project = await this.projectService.findOne(download.file);
        if (!project || !project.downloadFile) {
            throw new NotFoundException(`Requested file not found.`);
        }

        await this.analyticsService.incrementAnalytics(download.file, "file");
        await this.analyticsService.incrementAnalytics(AnalyticsNames.totalDownloads, "general");

        const filePath = path.join(process.cwd(), project.downloadFile);

        let stat: Stats;
        try {
            stat = await fs.stat(filePath);
        } catch (_) {
            throw new HttpException("File not found.", HttpStatus.NOT_FOUND);
        }
        const fileSize = stat.size;

        const fileStream = createReadStream(project.downloadFile);

        res.setHeader("Access-Control-Expose-Headers", "Content-Disposition, Content-Length");
        res.set({
            "Content-Type": "application/octet-stream",
            "Content-Disposition": `attachment; filename="${download.file}"`,
            "Content-Length": fileSize.toString(),
        });
        return new StreamableFile(fileStream);
    }

    @Post("verify")
    @UseGuards(OptionalAuthGuard)
    @ApiBearerAuth()
    async verify(
        @Ip() ip: string,
        @Req() req: OptionalAuthenticatedRequest,
        @Query() query: VerifyDownloadDto,
    ): Promise<ProjectDto> {
        const download = await this.downloadService.download({ ipAddress: ip });
        const voucher = query.code
            ? await this.voucherService.getVoucher({ code: query.code })
            : null;

        if (!download) {
            throw new NotFoundException(`Download for your device could not be found.`);
        }

        const project = await this.projectService.findOne(download.file);
        const includeDraft = project?.id !== req.user?.id || !req.user?.admin;
        if (!project || (project.draft && !includeDraft)) {
            throw new NotFoundException(`Requested project not found.`);
        }

        const creator = await this.userService.userDetailedById(project.userId);
        const linkvertiseSecret = creator.customLinkvertise
            ? (creator.linkvertiseSecret ?? this.linkvertiseApiKey)
            : this.linkvertiseApiKey;

        if (!download.verified) {
            if (project.userId !== req.user?.id && !req.user?.admin) {
                if (query.code && !voucher) {
                    throw new UnauthorizedException("The voucher does not exist");
                }

                if (voucher) {
                    if (voucher.blocked) {
                        throw new ForbiddenException("Voucher is blocked");
                    }
                    if (
                        voucher.downloadCount >= voucher.maxDownloads ||
                        voucher.expiresAt.getTime() <= Date.now()
                    ) {
                        throw new GoneException(
                            "The voucher has either expired or already been used.",
                        );
                    }

                    if (
                        voucher.betterBedrockContentOnly &&
                        project.betterBedrockContent === false
                    ) {
                        throw new ForbiddenException(
                            "This voucher allows you to download only better bedrock content",
                        );
                    }

                    await this.voucherService.updateVoucher({
                        where: { code: query.code },
                        data: {
                            downloadCount: {
                                increment: 1,
                            },
                        },
                    });

                    await this.analyticsService.incrementAnalytics(
                        AnalyticsNames.voucherDownloads,
                        "general",
                    );
                }

                if (!voucher) {
                    const url = `https://publisher.linkvertise.com/api/v1/anti_bypassing?token=${linkvertiseSecret}&hash=${query.hash}`;

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

                    await this.analyticsService.incrementAnalytics(
                        AnalyticsNames.adDownloads,
                        "general",
                    );
                }
            }

            await this.downloadService.updateDownload({
                where: { ipAddress: ip },
                data: { verified: true },
            });
        }

        // Logger.error(canViewDraft);
        const detailedProject = await this.projectService.projectDetails(project.id, includeDraft);
        return { ...project, ...detailedProject };
    }

    @Post("generate")
    async generate(@Ip() ip, @Query() query: GenerateDownloadDto) {
        const project = await this.projectService.findOne(query.file);
        if (!project) {
            throw new NotFoundException(`Requested file not found`);
        }

        const download = await this.downloadService.download({ ipAddress: ip });

        if (download != null) {
            await this.downloadService.deleteDownload({ ipAddress: ip });
        }

        await this.downloadService.createDownload({
            ipAddress: ip,
            file: query.file,
        });

        await this.analyticsService.incrementAnalytics(
            AnalyticsNames.generatedDownloads,
            "general",
        );
    }
}
