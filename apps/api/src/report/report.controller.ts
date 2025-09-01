import {
    Body,
    ConflictException,
    Controller,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
    Req,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Throttle } from "@nestjs/throttler";
import { AdminAuthGuard } from "~/auth/admin-auth.guard";
import { UserAuthGuard } from "~/auth/user-auth.guard";
import { AuthenticatedRequest } from "~/common/types/authenticated-request.type";
import { ProjectService } from "~/project/project.service";
import { ReportProjectBodyDto } from "~/report/dto/report-project-body.dto";
import { ReportDto } from "~/report/dto/report.dto";
import { ReportService } from "~/report/report.service";
import { UserService } from "~/user/user.service";

@Controller("report")
export class ReportController {
    constructor(
        private reportService: ReportService,
        private projectService: ProjectService,
        private userService: UserService,
    ) {}

    @Post("project/:id")
    @UseGuards(UserAuthGuard)
    @ApiBearerAuth()
    @Throttle({
        default: {
            ttl: 60000,
            limit: 1,
        },
    })
    async reportProject(
        @Param("id") id: string,
        @Req() req: AuthenticatedRequest,
        @Body() body: ReportProjectBodyDto,
    ) {
        const project = await this.projectService.findOne(id);

        if (!project) {
            throw new NotFoundException("Project not found");
        }

        if (project.userId === req.user.id) {
            throw new ConflictException("You can't report your own project");
        }

        return this.reportService.reportProject({
            reportedProjectId: id,
            reporterId: req.user.id,
            message: body.message,
        });
    }

    @Post("user/:id")
    @UseGuards(UserAuthGuard)
    @ApiBearerAuth()
    @Throttle({
        default: {
            ttl: 60000,
            limit: 1,
        },
    })
    async reportUser(
        @Param("id") id: string,
        @Req() req: AuthenticatedRequest,
        @Body() body: ReportProjectBodyDto,
    ) {
        const user = await this.userService.userInfoById(id);

        if (!user) {
            throw new NotFoundException("User not found");
        }

        if (user.id === req.user.id) {
            throw new ConflictException("You can't report yourself");
        }

        return this.reportService.reportUser({
            reportedUserId: id,
            reporterId: req.user.id,
            message: body.message,
        });
    }

    @Get()
    @UseGuards(AdminAuthGuard)
    @ApiBearerAuth()
    async fetchReports(): Promise<ReportDto[]> {
        return this.reportService.fetchReports();
    }

    @Patch("resolve/:id")
    @UseGuards(AdminAuthGuard)
    @ApiBearerAuth()
    async resolveReport(@Param("id") id: string): Promise<ReportDto> {
        return this.reportService.resolveReport(id);
    }

    @Patch("reopen/:id")
    @UseGuards(AdminAuthGuard)
    @ApiBearerAuth()
    async reopenReport(@Param("id") id: string): Promise<ReportDto> {
        return this.reportService.reopenReport(id);
    }
}
