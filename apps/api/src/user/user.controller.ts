import { Body, Controller, Get, Param, Patch, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { UserAuthGuard } from "~/auth/user-auth.guard";
import { UserRatingDto } from "~/rating/dto/user-rating.dto";
import { RatingService } from "~/rating/rating.service";
import { SimpleUserDto } from "~/user/dto/simple-user.dto";
import { UpdateProfileDto } from "~/user/dto/update-profile.dto";
import { UserDto } from "~/user/dto/user.dto";
import { UserService } from "~/user/user.service";

@ApiTags("user")
@Controller("user")
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly ratingService: RatingService,
    ) {}

    @Get("name/:name")
    @ApiOkResponse({ description: "Returns user object", type: SimpleUserDto })
    async userInfoByName(@Param("name") name: string) {
        return await this.userService.userInfoByName(name);
    }

    @Get("id/:id")
    @ApiOkResponse({ description: "Returns user object", type: SimpleUserDto })
    async userInfoById(@Param("id") id: string) {
        return await this.userService.userInfoById(id);
    }

    @Patch()
    @UseGuards(UserAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ description: "Updates user profile", type: UserDto })
    async updateProfile(@Req() req, @Body() data: UpdateProfileDto) {
        return await this.userService.updateProfile(req.user.id, data);
    }

    @Get("rate/:id")
    @ApiOkResponse({
        description: "Successfully commented under a project",
        type: UserRatingDto,
    })
    async getUserRating(@Param("id") id: string): Promise<UserRatingDto> {
        return await this.ratingService.getProjectRating(id);
    }
}
