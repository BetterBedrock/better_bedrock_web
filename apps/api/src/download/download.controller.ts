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
import { VerifyDownloadDto } from "~/download/dto/verify-download.dto";
import { createReadStream, promises as fs, Stats } from "fs";
import path, { extname } from "path";
import { VoucherService } from "~/voucher/voucher.service";
import { SkipThrottle, Throttle } from "@nestjs/throttler";
import { AnalyticsNames } from "~/analytics/constants/analytics-names";
import { ProjectService } from "~/project/project.service";
import { UserService } from "~/user/user.service";
import { OptionalAuthGuard } from "~/auth/optional-auth.guard";
import { ProjectDto } from "~/project/dto/project.dto";
import { OptionalAuthenticatedRequest } from "~/common/types/optional-authenticated-request.type";
import { MonetizationType } from "@prisma/client";
import { MonetizationService } from "~/monetization/monetization.service";
import { GenerateDownloadResponseDto } from "~/download/dto/generate-download-response.dto";

@Controller("download")
export class DownloadController {
    private readonly monetizationApiKey = process.env.MONETIZATION_API_KEY;
    private readonly monetizationApiMethod = process.env.MONETIZATION_API_METHOD;

    constructor(
        private downloadService: DownloadService,
        private analyticsService: AnalyticsService,
        private voucherService: VoucherService,
        private projectService: ProjectService,
        private userService: UserService,
        private monetizationService: MonetizationService,
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

        const ext = extname(project.downloadFile);

        res.setHeader("Access-Control-Expose-Headers", "Content-Disposition, Content-Length");
        res.set({
            "Content-Type": "application/octet-stream",
            "Content-Disposition": `attachment; filename="${download.file + ext}"`,
            "Content-Length": fileSize.toString(),
        });
        return new StreamableFile(fileStream);
    }

    @Post("verify")
    @UseGuards(OptionalAuthGuard)
    @ApiBearerAuth()
    @Throttle({
        default: {
            ttl: 60000,
            limit: 50,
        },
    })
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
        const { finalSecret } = this.monetizationService.resolveCreatorMonetization(creator);

        if (!download.verified) {
            if (
                query.hash !== download.hash &&
                project.userId !== req.user?.id &&
                !req.user?.admin
            ) {
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
                    await this.monetizationService.linkvertiseVerifyHash(finalSecret, query.hash);
                    await this.analyticsService.incrementAnalytics(
                        AnalyticsNames.adDownloads,
                        "general",
                    );
                }
            }

            if (query.hash === download.hash) {
                await this.analyticsService.incrementAnalytics(
                    AnalyticsNames.adDownloads,
                    "general",
                );
            }

            await this.downloadService.updateDownload({
                where: { ipAddress: ip },
                data: { verified: true },
            });
        }

        const detailedProject = await this.projectService.projectDetails(project.id, includeDraft);
        return { ...project, ...detailedProject };
    }

    @Post("generate")
    async generate(
        @Ip() ip,
        @Query() query: GenerateDownloadDto,
    ): Promise<GenerateDownloadResponseDto> {
        const project = await this.projectService.findOne(query.file);
        if (!project) {
            throw new NotFoundException(`Requested file not found`);
        }

        const download = await this.downloadService.download({ ipAddress: ip });

        if (download != null) {
            await this.downloadService.deleteDownload({ ipAddress: ip });
        }

        const creator = await this.userService.userDetailedById(project.userId);
        const { finalSecret, finalMethod, finalId } =
            this.monetizationService.resolveCreatorMonetization(creator);

        const newDownload = await this.downloadService.createDownload({
            ipAddress: ip,
            file: query.file,
        });

        await this.analyticsService.incrementAnalytics(
            AnalyticsNames.generatedDownloads,
            "general",
        );

        let finalUrl = "https://betterbedrock.com/verify";
        switch (finalMethod) {
            case MonetizationType.linkvertise:
                if (!finalId) break;

                finalUrl = await this.monetizationService.linkvertiseEncodeUrl(finalId);
                break;
            case MonetizationType.lootlabs: {
                const hashedUrl = await this.monetizationService.lootlabsEncodeUrl(
                    finalSecret,
                    newDownload.hash ?? undefined,
                );

                finalUrl = `https://loot-link.com/s?${finalId}&data=${hashedUrl}`;
                break;
            }
        }

        return { url: finalUrl };
    }
}
