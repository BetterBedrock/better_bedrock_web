import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import {
    ApiBearerAuth,
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { AdminAuthGuard } from "~/auth/admin-auth.guard";
import { AuthService } from "~/auth/auth.service";
import { AuthorizeDto } from "~/auth/dto/authorize.dto";
import { JwtTokenDto } from "~/auth/dto/jwt-token.dto";
import { UserAuthGuard } from "~/auth/user-auth.guard";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post()
    @ApiOkResponse({
        description: "Successfully authorized connection with account ",
        type: JwtTokenDto,
    })
    async authorize(@Body() data: AuthorizeDto): Promise<JwtTokenDto> {
        return await this.authService.authorize(data);
    }

    @Get()
    @UseGuards(UserAuthGuard)
    @ApiBearerAuth()
    async authenticate(@Req() req) {
        return req.user;
    }

    @Get("admin")
    @UseGuards(AdminAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ description: "Successfully authenticated" })
    @ApiInternalServerErrorResponse({ description: "Secret for admin panel is not set" })
    @ApiUnauthorizedResponse({ description: "Could not authenticate" })
    async adminAuthenticate() {
        // No need to put anything, all authentication happens in AdminAuthGuard
        return;
    }
}
