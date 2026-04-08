import { Configuration, SettingsApi, SettingsDto } from "@/shared/lib/openapi";
import { axiosCustomInstance } from "@/shared/lib/utils";
import { baseUrl } from "@/shared/lib/utils";

const config = new Configuration({
    basePath: baseUrl,
});

const settingsApi = new SettingsApi(config, undefined, axiosCustomInstance);

export const fetchSettingsRequest = async () =>
    settingsApi.settingsControllerSettings()

export const updateSettingsRequest = async (settings: SettingsDto, secret: string) =>
    settingsApi.settingsControllerUpdateSettings(settings, { headers: { Authorization: "Bearer " + secret } })
