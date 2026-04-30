import { Controller, ForbiddenException, Get, Ip, Param, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Throttle } from "@nestjs/throttler";
import { AnalyticsService } from "~/analytics/analytics.service";
import { AnalyticsDto } from "~/analytics/dto/analytics.dto";
import { LiveCountDto } from "~/analytics/dto/live-count.dto";
import { PingDto } from "~/analytics/dto/ping.dto";
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

    @Get("ping/:id")
    @Throttle({
        default: {
            ttl: 30_000,
            limit: 3,
        },
    })
    ping(@Ip() ip: string, @Param() params: PingDto) {
        this.analyticsService.ping(ip, params.id);
    }

    @Get("live")
    @UseGuards(AdminAuthGuard)
    @ApiBearerAuth()
    liveCount(): LiveCountDto {
        return { online: this.analyticsService.getLiveCount() };
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
