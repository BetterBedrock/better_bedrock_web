import { DownloadsCategoryDto } from "~/assets/content/dto/downloads-category.dto";

export enum SEARCH_PROJECT_TYPES {
    all = "All",
    texturepacks = "Texture packs",
    addons = "Addons",
    scripts = "Scripts",
    maps = "Maps",
    skinPacks = "Skin packs",
    other = "Other",
}


export enum PROJECT_TYPES {
    texturepacks = "Texture packs",
    addons = "Addons",
    scripts = "Scripts",
    maps = "Maps",
    skinPacks = "Skin packs",
    other = "Other",
}

export type ProjectTypeKey = keyof typeof PROJECT_TYPES;
export type SearchProjectTypeKey = keyof typeof SEARCH_PROJECT_TYPES;

export const DOWNLOADS_IDS = {
    betterBedrockClientV80: "better_bedrock_texture_pack_v8.0.mcpack",

    betterBedrockClientV74: "better_bedrock_texture_pack_v7.4",
    betterBedrockClientV73: "better_bedrock_texture_pack_v7.3",
    betterBedrockClientV72: "better_bedrock_texture_pack_v7.2",
    betterBedrockClientV711: "better_bedrock_texture_pack_v7.1.1",
    betterBedrockClientV71: "better_bedrock_texture_pack_v7.1",
    betterBedrockClientV7: "better_bedrock_texture_pack_v7.0",
    betterBedrockApp: "better_bedrock_app.apk",
    betterBedrockWindowsClientV1: "better_bedrock_client_v1.exe",

    betterBedrockClientV6: "better_bedrock_client_v6",

    betterBedrockClientV5ErrorFix: "better_bedrock_client_v5_error_fix_2.0",
    betterBedrockClientV5Patch: "better_bedrock_client_v5_patch",
    betterBedrockClientV5Config: "better_bedrock_client_v5_config",
    betterBedrockClientV5: "better_bedrock_client_v5",

    betterBedrockClientV4Patch: "better_bedrock_client_v4_patch",
    betterBedrockClientV4Lite: "better_bedrock_client_v4_lite",
    betterBedrockClientV4: "better_bedrock_client_v4",

    betterBedrockClientV3: "better_bedrock_client_v3",

    betterBedrockClientV2: "better_bedrock_client_v2",

    betterBedrockClientV1: "better_bedrock_client_v1",

    betterBedrockBetterFogs: "better_bedrock_better_fogs",
    betterBedrockCleanGlass: "better_bedrock_clean_glass",
    betterBedrockCleanWater: "better_bedrock_clean_water",
    betterBedrockDarkMode: "better_bedrock_dark_mode",
    betterBedrockDarkUI: "better_bedrock_dark_ui",
    betterBedrockFullGrass: "better_bedrock_full_grass",
    betterBedrockLowFire: "better_bedrock_low_fire",
    betterBedrockWaypoints: "better_bedrock_waypoints",
    betterBedrockParticleLimiter: "better_bedrock_particle_limiter",
};

export const SIDE_PROJECTS_LIST = [
    "murder_detector+",
    "custom_sky_overlay",
];

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
                    projectId: "better_bedrock_texture_pack",
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
                    projectId: "waypoints",
                    buttonType: "dark",
                    imageAssetUrl: "/static/uploads/public/images/logo2.png",

                },
                {
                    titleColor: "rgb(255, 255, 85)",
                    description:
                        "Changes all fogs to make them unlimited and better for visibility",
                    projectId: "better_fogs",
                    buttonType: "dark", imageAssetUrl: "/static/uploads/public/images/logo2.png",

                },
                {
                    titleColor: "rgb(255, 255, 85)",
                    description: "Changes most BB textures to darker ones",
                    projectId: "dark_ui",
                    buttonType: "dark", imageAssetUrl: "/static/uploads/public/images/logo2.png",

                },
                {
                    titleColor: "rgb(255, 255, 85)",
                    description: "Changes water textures to make them more clean and visible",
                    projectId: "clean_water",
                    buttonType: "dark", imageAssetUrl: "/static/uploads/public/images/logo2.png",

                },
                {
                    titleColor: "rgb(255, 170, 0)",
                    description: "Darker alternative to the vanilla textures",
                    projectId: "dark_mode",
                    buttonType: "dark", imageAssetUrl: "/static/uploads/public/images/logo3.png",

                },
                {
                    titleColor: "rgb(255, 170, 0)",
                    description:
                        "Adds ability to limit particles by 3 options: Disabled, Minimal, All",
                    projectId: "particle_limiter",
                    buttonType: "dark", imageAssetUrl: "/static/uploads/public/images/logo3.png",

                },
                {
                    titleColor: "rgb(255, 170, 0)",
                    description: "Adds lower fire texture on HUD to improve visibility",
                    projectId: "low_fire",
                    buttonType: "dark", imageAssetUrl: "/static/uploads/public/images/logo3.png",

                },
                {
                    titleColor: "rgb(255, 170, 0)",
                    description: "Changes grass textures to make them look connected",
                    projectId: "full_grass",
                    buttonType: "dark", imageAssetUrl: "/static/uploads/public/images/logo3.png",

                },
                {
                    titleColor: "rgb(255, 170, 0)",
                    description:
                        "Changes glass textures to make them look connected and less distracting",
                    projectId: "clean_glass",
                    buttonType: "dark", imageAssetUrl: "/static/uploads/public/images/logo3.png",

                },
            ],
        },
        {
            title: "Archived",
            description:
                "If you want to try older versions and enjoy old-school Better Bedrock B) then you have that possibility! Note that these packs, and software, are deprecated, and may not be stable. We also save main content, so you cannot find here older extension packs.",
            items: [
                // {
                //     description: "Archived and discontinued.",
                //     projectId: DOWNLOADS_IDS.betterBedrockApp,
                //     buttonType: "white", imageAssetUrl: "/static/uploads/public/images/favicon.png",
                // },
                // {
                //     description: "Archived and discontinued.",
                //     projectId: DOWNLOADS_IDS.betterBedrockWindowsClientV1,
                //     buttonType: "white", imageAssetUrl: "/static/uploads/public/images/favicon.png",

                // },
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
