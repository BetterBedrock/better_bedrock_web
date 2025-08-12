import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import {
    ApiBearerAuth,
    ApiCreatedResponse,
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
import { UserDto } from "~/user/dto/user.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    @ApiCreatedResponse({
        description: "Successfully authorized connection with account ",
        type: JwtTokenDto,
    })
    async authorize(@Body() data: AuthorizeDto): Promise<JwtTokenDto> {
        return await this.authService.authorize(data);
    }

    @Get()
    @ApiOkResponse({ description: "Successfully authenticated", type: UserDto })
    @UseGuards(UserAuthGuard)
    @ApiBearerAuth()
    async authenticate(@Req() req): Promise<UserDto> {
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
