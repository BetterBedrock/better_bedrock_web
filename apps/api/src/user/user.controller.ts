import {
    Body,
    Controller,
    ForbiddenException,
    Get,
    Param,
    Patch,
    Req,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";
import { AdminAuthGuard } from "~/auth/admin-auth.guard";
import { UserAuthGuard } from "~/auth/user-auth.guard";
import { AuthenticatedRequest } from "~/common/types/authenticated-request.type";
import { UserRatingDto } from "~/rating/dto/user-rating.dto";
import { RatingService } from "~/rating/rating.service";
import { ManageProfileDto } from "~/user/dto/manage-profile.dto";
import { SimpleUserDto } from "~/user/dto/simple-user.dto";
import { UpdateProfileDto } from "~/user/dto/update-profile.dto";
import { UserDto } from "~/user/dto/user.dto";
import { UserService } from "~/user/user.service";

@Controller("user")
export class UserController {
    constructor(
        private userService: UserService,
        private ratingService: RatingService,
    ) {}

    @Get("name/:name")
    userInfoByName(@Param("name") name: string): Promise<SimpleUserDto> {
        return this.userService.userInfoByName(name);
    }

    @Get("id/:id")
    userInfoById(@Param("id") id: string): Promise<SimpleUserDto> {
        return this.userService.userInfoById(id);
    }

    @Get("name/:name/details")
    @UseGuards(AdminAuthGuard)
    @ApiBearerAuth()
    detailedUserInfoByName(@Param("name") name: string): Promise<UserDto> {
        return this.userService.detailedUserInfoByName(name);
    }

    @Get("id/:id/details")
    @UseGuards(AdminAuthGuard)
    @ApiBearerAuth()
    detailedUserInfoById(@Param("id") id: string): Promise<UserDto> {
        return this.userService.detailedUserInfoById(id);
    }

    @Patch()
    @UseGuards(UserAuthGuard)
    @ApiBearerAuth()
    updateProfile(
        @Req() req: AuthenticatedRequest,
        @Body() data: UpdateProfileDto,
    ): Promise<UserDto> {
        if (req.user.banned) {
            throw new ForbiddenException("This account is banned");
        }

        return this.userService.updateProfile(req.user.id, data);
    }

    @Patch("id/:id")
    @UseGuards(AdminAuthGuard)
    @ApiBearerAuth()
    manageProfile(@Param("id") id: string, @Body() data: ManageProfileDto): Promise<UserDto> {
        return this.userService.updateProfile(id, data);
    }

    @Get("rate/:id")
    profileRating(@Param("id") id: string): Promise<UserRatingDto> {
        return this.ratingService.getProfileRating(id);
    }

    @Get("rating/project/:projectId")
    @UseGuards(UserAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ type: Number })
    userRating(
        @Param("projectId") projectId: string,
        @Req() req: AuthenticatedRequest,
    ): Promise<number | null> {
        return this.ratingService.getUserRating(req.user.id, projectId);
    }
}
