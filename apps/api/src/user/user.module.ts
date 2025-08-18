import { Module } from "@nestjs/common";
import { PrismaService } from "~/prisma.service";
import { UserController } from "~/user/user.controller";
import { UserService } from "~/user/user.service";

@Module({
    controllers: [UserController],
    providers: [UserService, PrismaService],
})
export class UserModule {}
