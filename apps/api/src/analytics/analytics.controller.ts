import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOkResponse, ApiBearerAuth } from "@nestjs/swagger";
import { AnalyticsService } from "src/analytics/analytics.service";
import { AdminAuthGuard } from "src/auth/admin-auth.guard";
import { AnalyticsDto } from "src/analytics/dto/analytics.dto";

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
}
