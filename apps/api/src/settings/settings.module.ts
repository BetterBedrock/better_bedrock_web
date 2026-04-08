import { Module } from "@nestjs/common";
import { PrismaService } from "~/prisma.service";
import { SettingsController } from "~/settings/settings.controller";
import { SettingsService } from "~/settings/settings.service";

@Module({
    controllers: [SettingsController],
    providers: [SettingsService, PrismaService],
})
export class SettingsModule {}
