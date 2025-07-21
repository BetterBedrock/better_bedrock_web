import { Module } from "@nestjs/common";
import { AuthController } from "src/auth/auth.controller";

@Module({
    controllers: [AuthController],
})
export class AuthModule {}
