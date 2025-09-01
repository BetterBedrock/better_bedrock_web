import { Controller, Get, Req, UseGuards } from "@nestjs/common";
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

    @Get("/user")
    @UseGuards(UserAuthGuard)
    @ApiBearerAuth()
    user(@Req() req: AuthenticatedRequest): Promise<AnalyticsDto[]> {
        return this.analyticsService.userAnalytics(req.user.id);
    }
}
