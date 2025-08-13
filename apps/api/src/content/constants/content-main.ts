import { DownloadsCategoryDto } from "~/download/dto/downloads-category.dto";

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
                    title: "Better Bedrock v8.0",
                    creator: "axmbro",
                    description: "Enhance your gameplay with multiple mods and adjustable options!",
                    downloadId: DOWNLOADS_IDS.betterBedrockClientV80,
                    buttonType: "green",
                    itemWeight: 11.5,
                    betterBedrockContent: true,
                    imageAssetUrl: ["/static/uploads/public/images/favicon.png"],
                    tags: ["MCBE v1.21.80+"],
                    tagBgColor: "rgb(29, 77, 19)",
                },
            ],
        },
        {
            title: "Extensions",
            description:
                "Extra packs that enhance your gameplay even further. Make sure to put these packs in correct order. Yellow ones require main BB pack to work, while orange ones can be used without it.",
            items: [
                {
                    title: "Waypoints v2.2",
                    titleColor: "rgb(255, 255, 85)",
                    tags: ["BB v8.0+", "MCBE v1.21.80+"],
                    creator: "axmbro",
                    description:
                        "Adds ability to create vertical beams around world to improve positioning",
                    downloadId: DOWNLOADS_IDS.betterBedrockWaypoints,
                    itemWeight: 0.04,
                    buttonType: "dark",
                    betterBedrockContent: true,
                    imageAssetUrl: ["/static/uploads/public/images/logo2.png"],
                    richDescription: [
                        {
                            name: "Effects",
                            images: [
                                "/static/uploads/public/images/extensions/waypoints1.png",
                                "/static/uploads/public/images/extensions/waypoints2.png",
                            ],
                        },
                    ],
                },
                {
                    title: "Better Fogs v2.1",
                    titleColor: "rgb(255, 255, 85)",
                    tags: ["BB v7.0+", "MCBE v1.20.0+"],
                    creator: "axmbro",
                    description:
                        "Changes all fogs to make them unlimited and better for visibility",
                    downloadId: DOWNLOADS_IDS.betterBedrockBetterFogs,
                    itemWeight: 0.02,
                    buttonType: "dark",
                    betterBedrockContent: true,
                    imageAssetUrl: ["/static/uploads/public/images/logo2.png"],
                    richDescription: [
                        {
                            name: "Before & After",
                            images: [
                                "/static/uploads/public/images/extensions/better_fogs3.png",
                                "/static/uploads/public/images/extensions/better_fogs1.png",
                            ],
                        },
                        {
                            name: "subpacks: Default & Clean lava",
                            images: [
                                "/static/uploads/public/images/extensions/better_fogs2.png",
                                "/static/uploads/public/images/extensions/better_fogs4.png",
                            ],
                        },
                    ],
                },
                {
                    title: "Dark UI v1.1",
                    titleColor: "rgb(255, 255, 85)",
                    tags: ["BB v8.0+", "MCBE v1.21.80+"],
                    creator: "axmbro",
                    description: "Changes most BB textures to darker ones",
                    downloadId: DOWNLOADS_IDS.betterBedrockDarkUI,
                    itemWeight: 0.001,
                    buttonType: "dark",
                    betterBedrockContent: true,
                    imageAssetUrl: ["/static/uploads/public/images/logo2.png"],
                    richDescription: [
                        {
                            name: "Start Screen",
                            images: [
                                "/static/uploads/public/images/extensions/dark_ui1.png",
                                "/static/uploads/public/images/extensions/dark_ui4.png",
                            ],
                        },
                        {
                            name: "Pause Screen",
                            images: [
                                "/static/uploads/public/images/extensions/dark_ui2.png",
                                "/static/uploads/public/images/extensions/dark_ui5.png",
                            ],
                        },
                        {
                            name: "Mod Menu",
                            images: [
                                "/static/uploads/public/images/extensions/dark_ui3.png",
                                "/static/uploads/public/images/extensions/dark_ui6.png",
                            ],
                        },
                    ],
                },
                {
                    title: "Clean Water v1.0",
                    titleColor: "rgb(255, 255, 85)",
                    tags: ["BB v6.0+", "MCBE v1.20.0+"],
                    creator: "axmbro",
                    description: "Changes water textures to make them more clean and visible",
                    downloadId: DOWNLOADS_IDS.betterBedrockCleanWater,
                    itemWeight: 0.01,
                    buttonType: "dark",
                    betterBedrockContent: true,
                    imageAssetUrl: ["/static/uploads/public/images/logo2.png"],
                    richDescription: [
                        {
                            name: "Before & After",
                            images: [
                                "/static/uploads/public/images/extensions/clean_water1.png",
                                "/static/uploads/public/images/extensions/clean_water2.png",
                            ],
                        },
                    ],
                },
                {
                    title: "Dark Mode v1.2",
                    titleColor: "rgb(255, 170, 0)",
                    tags: ["MCBE v1.20.0+"],
                    creator: "axmbro",
                    description: "Darker alternative to the vanilla textures",
                    downloadId: DOWNLOADS_IDS.betterBedrockDarkMode,
                    itemWeight: 1.2,
                    buttonType: "dark",
                    betterBedrockContent: true,
                    imageAssetUrl: ["/static/uploads/public/images/logo3.png"],
                    richDescription: [
                        {
                            name: "Settings Screen",
                            images: [
                                "/static/uploads/public/images/extensions/dark_mode1.png",
                                "/static/uploads/public/images/extensions/dark_mode4.png",
                            ],
                        },
                        {
                            name: "Chest Screen",
                            images: [
                                "/static/uploads/public/images/extensions/dark_mode2.png",
                                "/static/uploads/public/images/extensions/dark_mode5.png",
                            ],
                        },
                        {
                            name: "Inventory Screen",
                            images: [
                                "/static/uploads/public/images/extensions/dark_mode3.png",
                                "/static/uploads/public/images/extensions/dark_mode6.png",
                            ],
                        },
                    ],
                },
                {
                    title: "Particle Limiter v2.2",
                    titleColor: "rgb(255, 170, 0)",
                    tags: ["MCBE v1.13.0+"],
                    creator: "axmbro",
                    description:
                        "Adds ability to limit particles by 3 options: Disabled, Minimal, All",
                    downloadId: DOWNLOADS_IDS.betterBedrockParticleLimiter,
                    itemWeight: 0.13,
                    buttonType: "dark",
                    betterBedrockContent: true,
                    imageAssetUrl: ["/static/uploads/public/images/logo3.png"],
                    richDescription: [
                        {
                            name: "All, Minimal, Disabled",
                            images: [
                                "/static/uploads/public/images/extensions/particle_limiter1.png",
                                "/static/uploads/public/images/extensions/particle_limiter2.png",
                                "/static/uploads/public/images/extensions/particle_limiter3.png",
                            ],
                        },
                    ],
                },
                {
                    title: "Low Fire v1.1",
                    titleColor: "rgb(255, 170, 0)",
                    tags: ["MCBE v1.13.0+"],
                    creator: "axmbro",
                    description: "Adds lower fire texture on HUD to improve visibility",
                    downloadId: DOWNLOADS_IDS.betterBedrockLowFire,
                    itemWeight: 0.23,
                    buttonType: "dark",
                    betterBedrockContent: true,
                    imageAssetUrl: ["/static/uploads/public/images/logo3.png"],
                    richDescription: [
                        {
                            name: "Before & After",
                            images: [
                                "/static/uploads/public/images/extensions/low_fire1.png",
                                "/static/uploads/public/images/extensions/low_fire2.png",
                            ],
                        },
                    ],
                },
                {
                    title: "Full Grass v1.1",
                    titleColor: "rgb(255, 170, 0)",
                    tags: ["MCBE v1.13.0+"],
                    creator: "axmbro",
                    description: "Changes grass textures to make them look connected",
                    downloadId: DOWNLOADS_IDS.betterBedrockFullGrass,
                    itemWeight: 0.01,
                    buttonType: "dark",
                    betterBedrockContent: true,
                    imageAssetUrl: ["/static/uploads/public/images/logo3.png"],
                    richDescription: [
                        {
                            name: "Before & After",
                            images: [
                                "/static/uploads/public/images/extensions/full_grass1.png",
                                "/static/uploads/public/images/extensions/full_grass2.png",
                            ],
                        },
                    ],
                },
                {
                    title: "Clean Glass v1.1",
                    titleColor: "rgb(255, 170, 0)",
                    tags: ["MCBE v1.13.0+"],
                    creator: "axmbro",
                    description:
                        "Changes glass textures to make them look connected and less distracting",
                    downloadId: DOWNLOADS_IDS.betterBedrockCleanGlass,
                    itemWeight: 0.001,
                    buttonType: "dark",
                    betterBedrockContent: true,
                    imageAssetUrl: ["/static/uploads/public/images/logo3.png"],
                    richDescription: [
                        {
                            name: "Before & After",
                            images: [
                                "/static/uploads/public/images/extensions/clean_glass1.png",
                                "/static/uploads/public/images/extensions/clean_glass2.png",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            title: "Archived",
            description:
                "If you want to try older versions and enjoy old-school Better Bedrock B) then you have that possibility! Note that these packs, and software, are deprecated, and may not be stable. We also save main content, so you cannot find here older extension packs.",
            items: [
                {
                    title: "Mobile App 1.1.1",
                    creator: "iDarkQ",
                    description: "Archived and discontinued.",
                    downloadId: DOWNLOADS_IDS.betterBedrockApp,
                    itemWeight: 27.74,
                    buttonType: "white",
                    betterBedrockContent: true,
                    imageAssetUrl: ["/static/uploads/public/images/favicon.png"],
                },
                {
                    title: "Client V1",
                    creator: "iDarkQ",
                    description: "Archived and discontinued.",
                    downloadId: DOWNLOADS_IDS.betterBedrockWindowsClientV1,
                    itemWeight: 32.07,
                    buttonType: "white",
                    betterBedrockContent: true,
                    imageAssetUrl: ["/static/uploads/public/images/favicon.png"],
                },
                {
                    title: "Better Bedrock v7.4",
                    creator: "axmbro",
                    description: "Archived and discontinued.",
                    downloadId: DOWNLOADS_IDS.betterBedrockClientV74,
                    itemWeight: 10.1,
                    buttonType: "white",
                    betterBedrockContent: true,
                    imageAssetUrl: ["/static/uploads/public/images/favicon.png"],
                },
                {
                    title: "Better Bedrock V6",
                    creator: "axmbro",
                    description: "Archived and discontinued.",
                    downloadId: DOWNLOADS_IDS.betterBedrockClientV6,
                    itemWeight: 2.71,
                    buttonType: "white",
                    betterBedrockContent: true,
                    imageAssetUrl: ["/static/uploads/public/images/favicon.png"],
                },
                {
                    title: "Better Bedrock V5",
                    creator: "axmbro",
                    description: "Archived and discontinued.",
                    downloadId: DOWNLOADS_IDS.betterBedrockClientV5,
                    itemWeight: 17.8,
                    buttonType: "white",
                    betterBedrockContent: true,
                    imageAssetUrl: ["/static/uploads/public/images/favicon.png"],
                },
                {
                    title: "Better Bedrock V5 Error Fix V2.0",
                    creator: "axmbro",
                    description: "Archived and discontinued.",
                    downloadId: DOWNLOADS_IDS.betterBedrockClientV5ErrorFix,
                    itemWeight: 0.483,
                    buttonType: "white",
                    betterBedrockContent: true,
                    imageAssetUrl: ["/static/uploads/public/images/favicon.png"],
                },
                {
                    title: "Better Bedrock V5 Patch V1.2",
                    creator: "axmbro",
                    description: "Archived and discontinued.",
                    downloadId: DOWNLOADS_IDS.betterBedrockClientV5Patch,
                    itemWeight: 0.483,
                    buttonType: "white",
                    betterBedrockContent: true,
                    imageAssetUrl: ["/static/uploads/public/images/favicon.png"],
                },
                {
                    title: "Better Bedrock V5 Config",
                    creator: "axmbro",
                    description: "Archived and discontinued.",
                    downloadId: DOWNLOADS_IDS.betterBedrockClientV5Config,
                    itemWeight: 0.471,
                    buttonType: "white",
                    betterBedrockContent: true,
                    imageAssetUrl: ["/static/uploads/public/images/favicon.png"],
                },
                {
                    title: "Better Bedrock V4 Patch",
                    creator: "axmbro",
                    description: "Archived and discontinued.",
                    downloadId: DOWNLOADS_IDS.betterBedrockClientV4Patch,
                    itemWeight: 0.486,
                    buttonType: "white",
                    betterBedrockContent: true,
                    imageAssetUrl: ["/static/uploads/public/images/favicon.png"],
                },
                {
                    title: "Better Bedrock V4 Lite",
                    creator: "axmbro",
                    description: "Archived and discontinued.",
                    downloadId: DOWNLOADS_IDS.betterBedrockClientV4Lite,
                    itemWeight: 49.23,
                    buttonType: "white",
                    betterBedrockContent: true,
                    imageAssetUrl: ["/static/uploads/public/images/favicon.png"],
                },
                {
                    title: "Better Bedrock V4",
                    creator: "axmbro",
                    description: "Archived and discontinued.",
                    downloadId: DOWNLOADS_IDS.betterBedrockClientV4,
                    itemWeight: 49.42,
                    buttonType: "white",
                    betterBedrockContent: true,
                    imageAssetUrl: ["/static/uploads/public/images/favicon.png"],
                },
                {
                    title: "Better Bedrock V3",
                    creator: "axmbro",
                    description: "Archived and discontinued.",
                    downloadId: DOWNLOADS_IDS.betterBedrockClientV3,
                    itemWeight: 6.86,
                    buttonType: "white",
                    betterBedrockContent: true,
                    imageAssetUrl: ["/static/uploads/public/images/favicon.png"],
                },
                {
                    title: "Better Bedrock V2",
                    creator: "axmbro",
                    description: "Archived and discontinued.",
                    downloadId: DOWNLOADS_IDS.betterBedrockClientV2,
                    itemWeight: 4.45,
                    buttonType: "white",
                    betterBedrockContent: true,
                    imageAssetUrl: ["/static/uploads/public/images/favicon.png"],
                },
                {
                    title: "Better Bedrock V1",
                    creator: "axmbro",
                    description: "Archived and discontinued.",
                    downloadId: DOWNLOADS_IDS.betterBedrockClientV1,
                    itemWeight: 20.14,
                    buttonType: "white",
                    betterBedrockContent: true,
                    imageAssetUrl: ["/static/uploads/public/images/favicon.png"],
                },
            ],
        },
    ],
};
