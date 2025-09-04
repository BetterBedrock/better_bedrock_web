import { Injectable } from "@nestjs/common";
import { PrismaService } from "~/prisma.service";
import { ManageProfileDto } from "~/user/dto/manage-profile.dto";
import { UpdateProfileDto } from "~/user/dto/update-profile.dto";

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) {}

    async userInfoByName(name: string) {
        return this.prismaService.user.findFirstOrThrow({
            where: { name, banned: false },
            omit: { email: true, linkvertiseSecret: true, googleId: true },
        });
    }

    async detailedUserInfoByName(name: string) {
        return this.prismaService.user.findFirstOrThrow({
            where: { name },
        });
    }

    async detailedUserInfoById(id: string) {
        return this.prismaService.user.findFirstOrThrow({
            where: { id },
        });
    }

    async userInfoById(id: string) {
        return this.prismaService.user.findFirstOrThrow({
            where: { id, banned: false },
            omit: { email: true, linkvertiseSecret: true, googleId: true },
        });
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
