import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOkResponse, ApiBearerAuth } from "@nestjs/swagger";
import { AnalyticsService } from "~/analytics/analytics.service";
import { AdminAuthGuard } from "~/auth/admin-auth.guard";
import { AnalyticsDto } from "~/analytics/dto/analytics.dto";
import { UserAuthGuard } from "~/auth/user-auth.guard";

@ApiTags("analytics")
@Controller("analytics")
@ApiBearerAuth()
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) {}

    @Get()
    @ApiOkResponse({
        description: "Analytics about downloads, vouchers, and more",
        type: AnalyticsDto,
        isArray: true,
    })
    @UseGuards(AdminAuthGuard)
    async analytics(): Promise<AnalyticsDto[]> {
        return await this.analyticsService.analytics();
    }

    @Get("/user")
    @UseGuards(UserAuthGuard)
    @ApiBearerAuth()
    user(@Req() req: AuthenticatedRequest): Promise<AnalyticsDto[]> {
        return this.analyticsService.userAnalytics(req.user.id);
    }
}
