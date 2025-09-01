import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { AuthService } from "~/auth/auth.service";
import { AuthorizeDto } from "~/auth/dto/authorize.dto";
import { JwtTokenDto } from "~/auth/dto/jwt-token.dto";
import { UserAuthGuard } from "~/auth/user-auth.guard";
import { AuthenticatedRequest } from "~/common/types/authenticated-request.type";
import { UserDto } from "~/user/dto/user.dto";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("google")
    googleAuthorize(@Body() data: AuthorizeDto): Promise<JwtTokenDto> {
        return this.authService.googleAuthorize(data);
    }

    @Get("me")
    @UseGuards(UserAuthGuard)
    @ApiBearerAuth()
    authenticate(@Req() req: AuthenticatedRequest): UserDto {
        return req.user;
    }
}
