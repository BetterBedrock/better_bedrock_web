import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "~/prisma.service";
import { UpdateProfileDto } from "~/user/dto/update-profile.dto";

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    async userInfoByName(name: string) {
        return await this.prismaService.user.findFirstOrThrow({
            where: { name },
            omit: { email: true, linkvertiseSecret: true, googleId: true },
        });
    }

    async userInfoById(id: string) {
        return await this.prismaService.user.findFirstOrThrow({
            where: { id },
            omit: { email: true, linkvertiseSecret: true, googleId: true },
        });
    }

    async userDetailedById(id: string) {
        return await this.prismaService.user.findFirstOrThrow({
            where: { id },
        });
    }

    async updateProfile(id: string, data: UpdateProfileDto) {
        Logger.error({ id, data });

        return await this.prismaService.user.update({ where: { id }, data: data });
    }
}
