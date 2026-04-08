import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "~/prisma.service";
import { SettingsDto } from "~/settings/dto/settings.dto";

@Injectable()
export class SettingsService {
    constructor(private prismaService: PrismaService) {}

    async onModuleInit() {
        const existingSettings = await this.prismaService.settings.findFirst();

        if (existingSettings) return;

        await this.prismaService.settings.create({});
    }

    async settings() {
        const settings = await this.prismaService.settings.findFirst();
        if (!settings) throw new NotFoundException("No settings were found");

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...rest } = settings;
        return rest;
    }

    async updateSettings(newSettings: SettingsDto) {
        return this.prismaService.settings.update({
            where: { id: "singleton" },
            data: newSettings,
        });
    }
}
