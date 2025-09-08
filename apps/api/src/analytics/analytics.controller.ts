import { Controller, ForbiddenException, Get, Param, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { AnalyticsService } from "~/analytics/analytics.service";
import { AnalyticsDto } from "~/analytics/dto/analytics.dto";
import { AdminAuthGuard } from "~/auth/admin-auth.guard";
import { UserAuthGuard } from "~/auth/user-auth.guard";
import { AuthenticatedRequest } from "~/common/types/authenticated-request.type";

@Controller("analytics")
export class AnalyticsController {
    constructor(private analyticsService: AnalyticsService) {}

    @Get()
    @UseGuards(AdminAuthGuard)
    @ApiBearerAuth()
    analytics(): Promise<AnalyticsDto[]> {
        return this.analyticsService.analytics();
    }

    @Get("/user/:id")
    @UseGuards(UserAuthGuard)
    @ApiBearerAuth()
    user(@Req() req: AuthenticatedRequest, @Param("id") id: string): Promise<AnalyticsDto[]> {
        const user = req.user;

        if (user.id !== id && !user.admin) {
            throw new ForbiddenException("You are not allowed to view this user's analytics");
        }

        return this.analyticsService.userAnalytics(id);
    }
}
