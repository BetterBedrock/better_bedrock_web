import { DownloadsCategoryDto } from "~/assets/content/dto/downloads-category.dto";

export enum PROJECT_TYPES {
    texturepacks = "Texture packs",
    addons = "Addons",
    scripts = "Scripts",
    maps = "Maps",
    skinPacks = "Skin packs",
    other = "Other",
}

export const DOWNLOADS_IDS = {
    betterBedrockClientV80: "better_bedrock_texture_pack_v8.0.mcpack",

    betterBedrockClientV74: "better_bedrock_texture_pack_v7.4.mcpack",
    betterBedrockClientV73: "better_bedrock_texture_pack_v7.3.mcpack",
    betterBedrockClientV72: "better_bedrock_texture_pack_v7.2.mcpack",
    betterBedrockClientV711: "better_bedrock_texture_pack_v7.1.1.mcpack",
    betterBedrockClientV71: "better_bedrock_texture_pack_v7.1.mcpack",
    betterBedrockClientV7: "better_bedrock_texture_pack_v7.0.mcpack",
    betterBedrockApp: "better_bedrock_app.apk",
    betterBedrockWindowsClientV1: "better_bedrock_client_v1.exe",

    betterBedrockClientV6: "better_bedrock_client_v6.mcpack",

    betterBedrockClientV5ErrorFix: "better_bedrock_client_v5_error_fix_2.0.mcpack",
    betterBedrockClientV5Patch: "better_bedrock_client_v5_patch.mcpack",
    betterBedrockClientV5Config: "better_bedrock_client_v5_config.mcpack",
    betterBedrockClientV5: "better_bedrock_client_v5.mcpack",

    betterBedrockClientV4Patch: "better_bedrock_client_v4_patch.mcpack",
    betterBedrockClientV4Lite: "better_bedrock_client_v4_lite.mcpack",
    betterBedrockClientV4: "better_bedrock_client_v4.mcpack",

    betterBedrockClientV3: "better_bedrock_client_v3.mcpack",

    betterBedrockClientV2: "better_bedrock_client_v2.mcpack",

    betterBedrockClientV1: "better_bedrock_client_v1.mcpack",

    betterBedrockBetterFogs: "better_bedrock_better_fogs.mcpack",
    betterBedrockCleanGlass: "better_bedrock_clean_glass.mcpack",
    betterBedrockCleanWater: "better_bedrock_clean_water.mcpack",
    betterBedrockDarkMode: "better_bedrock_dark_mode.mcpack",
    betterBedrockDarkUI: "better_bedrock_dark_ui.mcpack",
    betterBedrockFullGrass: "better_bedrock_full_grass.mcpack",
    betterBedrockLowFire: "better_bedrock_low_fire.mcpack",
    betterBedrockWaypoints: "better_bedrock_waypoints.mcpack",
    betterBedrockParticleLimiter: "better_bedrock_particle_limiter.mcpack",
};

export const MAIN_LIST: DownloadsCategoryDto = {
    id: "main",
    name: "Main",
    lists: [
        {
            title: "Featured",
            description:
                "Enjoy playing Minecraft on a whole new level using latest version of the main texture pack!",
            items: [
                {
                    description: "Enhance your gameplay with multiple mods and adjustable options!",
                    projectId: "better_bedrock_v8",
                    buttonType: "green",
                    tagBgColor: "rgb(29, 77, 19)",
                    imageAssetUrl: "/static/uploads/public/images/favicon.png",
                },
            ],
        },
        {
            title: "Extensions",
            description:
                "Extra packs that enhance your gameplay even further. Make sure to put these packs in correct order. Yellow ones require main BB pack to work, while orange ones can be used without it.",
            items: [
                {
                    titleColor: "rgb(255, 255, 85)",
                    description:
                        "Adds ability to create vertical beams around world to improve positioning",
                    projectId: DOWNLOADS_IDS.betterBedrockWaypoints,
                    buttonType: "dark",
                    imageAssetUrl: "/static/uploads/public/images/logo2.png",

                },
                {
                    titleColor: "rgb(255, 255, 85)",
                    description:
                        "Changes all fogs to make them unlimited and better for visibility",
                    projectId: DOWNLOADS_IDS.betterBedrockBetterFogs,
                    buttonType: "dark", imageAssetUrl: "/static/uploads/public/images/logo2.png",

                },
                {
                    titleColor: "rgb(255, 255, 85)",
                    description: "Changes most BB textures to darker ones",
                    projectId: DOWNLOADS_IDS.betterBedrockDarkUI,
                    buttonType: "dark", imageAssetUrl: "/static/uploads/public/images/logo2.png",

                },
                {
                    titleColor: "rgb(255, 255, 85)",
                    description: "Changes water textures to make them more clean and visible",
                    projectId: DOWNLOADS_IDS.betterBedrockCleanWater,
                    buttonType: "dark", imageAssetUrl: "/static/uploads/public/images/logo2.png",

                },
                {
                    titleColor: "rgb(255, 170, 0)",
                    description: "Darker alternative to the vanilla textures",
                    projectId: DOWNLOADS_IDS.betterBedrockDarkMode,
                    buttonType: "dark", imageAssetUrl: "/static/uploads/public/images/logo3.png",

                },
                {
                    titleColor: "rgb(255, 170, 0)",
                    description:
                        "Adds ability to limit particles by 3 options: Disabled, Minimal, All",
                    projectId: DOWNLOADS_IDS.betterBedrockParticleLimiter,
                    buttonType: "dark", imageAssetUrl: "/static/uploads/public/images/logo3.png",

                },
                {
                    titleColor: "rgb(255, 170, 0)",
                    description: "Adds lower fire texture on HUD to improve visibility",
                    projectId: DOWNLOADS_IDS.betterBedrockLowFire,
                    buttonType: "dark", imageAssetUrl: "/static/uploads/public/images/logo3.png",

                },
                {
                    titleColor: "rgb(255, 170, 0)",
                    description: "Changes grass textures to make them look connected",
                    projectId: DOWNLOADS_IDS.betterBedrockFullGrass,
                    buttonType: "dark", imageAssetUrl: "/static/uploads/public/images/logo3.png",

                },
                {
                    titleColor: "rgb(255, 170, 0)",
                    description:
                        "Changes glass textures to make them look connected and less distracting",
                    projectId: DOWNLOADS_IDS.betterBedrockCleanGlass,
                    buttonType: "dark", imageAssetUrl: "/static/uploads/public/images/logo3.png",

                },
            ],
        },
        {
            title: "Archived",
            description:
                "If you want to try older versions and enjoy old-school Better Bedrock B) then you have that possibility! Note that these packs, and software, are deprecated, and may not be stable. We also save main content, so you cannot find here older extension packs.",
            items: [
                {
                    description: "Archived and discontinued.",
                    projectId: DOWNLOADS_IDS.betterBedrockApp,
                    buttonType: "white", imageAssetUrl: "/static/uploads/public/images/favicon.png",
                },
                {
                    description: "Archived and discontinued.",
                    projectId: DOWNLOADS_IDS.betterBedrockWindowsClientV1,
                    buttonType: "white", imageAssetUrl: "/static/uploads/public/images/favicon.png",

                },
                {
                    description: "Archived and discontinued.",
                    projectId: DOWNLOADS_IDS.betterBedrockClientV74,
                    buttonType: "white", imageAssetUrl: "/static/uploads/public/images/favicon.png",

                },
                {
                    description: "Archived and discontinued.",
                    projectId: DOWNLOADS_IDS.betterBedrockClientV6,
                    buttonType: "white", imageAssetUrl: "/static/uploads/public/images/favicon.png",

                },
                {
                    description: "Archived and discontinued.",
                    projectId: DOWNLOADS_IDS.betterBedrockClientV5,
                    buttonType: "white", imageAssetUrl: "/static/uploads/public/images/favicon.png",

                },
                {
                    description: "Archived and discontinued.",
                    projectId: DOWNLOADS_IDS.betterBedrockClientV5ErrorFix,
                    buttonType: "white", imageAssetUrl: "/static/uploads/public/images/favicon.png",

                },
                {
                    description: "Archived and discontinued.",
                    projectId: DOWNLOADS_IDS.betterBedrockClientV5Patch,
                    buttonType: "white", imageAssetUrl: "/static/uploads/public/images/favicon.png",

                },
                {
                    description: "Archived and discontinued.",
                    projectId: DOWNLOADS_IDS.betterBedrockClientV5Config,
                    buttonType: "white", imageAssetUrl: "/static/uploads/public/images/favicon.png",

                },
                {
                    description: "Archived and discontinued.",
                    projectId: DOWNLOADS_IDS.betterBedrockClientV4Patch,
                    buttonType: "white", imageAssetUrl: "/static/uploads/public/images/favicon.png",

                },
                {
                    description: "Archived and discontinued.",
                    projectId: DOWNLOADS_IDS.betterBedrockClientV4Lite,
                    buttonType: "white", imageAssetUrl: "/static/uploads/public/images/favicon.png",

                },
                {
                    description: "Archived and discontinued.",
                    projectId: DOWNLOADS_IDS.betterBedrockClientV4,
                    buttonType: "white", imageAssetUrl: "/static/uploads/public/images/favicon.png",

                },
                {
                    description: "Archived and discontinued.",
                    projectId: DOWNLOADS_IDS.betterBedrockClientV3,
                    buttonType: "white", imageAssetUrl: "/static/uploads/public/images/favicon.png",

                },
                {
                    description: "Archived and discontinued.",
                    projectId: DOWNLOADS_IDS.betterBedrockClientV2,
                    buttonType: "white", imageAssetUrl: "/static/uploads/public/images/favicon.png",

                },
                {
                    description: "Archived and discontinued.",
                    projectId: DOWNLOADS_IDS.betterBedrockClientV1,
                    buttonType: "white", imageAssetUrl: "/static/uploads/public/images/favicon.png",

                },
            ],
        },
    ],
};
