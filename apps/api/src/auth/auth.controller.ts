import { Controller, Get, UseGuards } from "@nestjs/common";
import {
    ApiBearerAuth,
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { AdminAuthGuard } from "~/auth/admin-auth.guard";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
    @Get()
    @UseGuards(AdminAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ description: "Successfully authenticated" })
    @ApiInternalServerErrorResponse({ description: "Secret for admin panel is not set" })
    @ApiUnauthorizedResponse({ description: "Could not authenticate" })
    async authenticate() {
        // No need to put anything, all authentication happens in AdminAuthGuard
        return;
    }
}
