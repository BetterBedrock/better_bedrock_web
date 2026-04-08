import { Body, Controller, Get, Patch, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { AdminAuthGuard } from "~/auth/admin-auth.guard";
import { SettingsDto } from "~/settings/dto/settings.dto";
import { SettingsService } from "~/settings/settings.service";

@Controller("settings")
export class SettingsController {
    constructor(private settingsService: SettingsService) {}

    @Get()
    settings(): Promise<SettingsDto> {
        return this.settingsService.settings();
    }

    @Patch()
    @UseGuards(AdminAuthGuard)
    @ApiBearerAuth()
    updateSettings(@Body() settings: SettingsDto) {
        return this.settingsService.updateSettings(settings);
    }
}
