import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "~/prisma.service";
import { RatingService } from "~/rating/rating.service";
import { ManageProfileDto } from "~/user/dto/manage-profile.dto";
import { UpdateProfileDto } from "~/user/dto/update-profile.dto";

@Injectable()
export class UserService {
    constructor(
        private prismaService: PrismaService,
        private ratingService: RatingService,
    ) {}

    async userInfoByName(name: string, admin?: boolean) {
        const user = await this.prismaService.user.findFirst({
            where: { name, banned: admin ? undefined : false },
            omit: { email: true, linkvertiseSecret: true, googleId: true },
        });

        if (!user) {
            throw new NotFoundException("User does not exist");
        }

        return user;
    }

    async userInfoById(id: string, admin?: boolean) {
        const user = await this.prismaService.user.findFirst({
            where: { id, banned: admin ? undefined : false },
            omit: { email: true, linkvertiseSecret: true, googleId: true },
        });

        if (!user) {
            throw new NotFoundException("User does not exist");
        }

        return user;
    }

    async detailedUserInfo(id: string) {
        const user = await this.prismaService.user.findFirstOrThrow({
            where: { id },
        });

        const rating = await this.ratingService.getProfileRating(user.id);

        return { ...user, rating };
    }

    async userDetailedById(id: string) {
        return this.prismaService.user.findFirstOrThrow({
            where: { id },
        });
    }

    async updateProfile(id: string, data: UpdateProfileDto | ManageProfileDto) {
        return this.prismaService.user.update({ where: { id }, data: data });
    }
}
