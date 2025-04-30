const DOWNLOADS_IDS = {
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

    murderDetectorV32: "murder_detector_v3.2.mcpack",
    murderDetectorV31: "murder_detector_v3.1.mcpack",
    murderDetectorV30: "murder_detector_v3.0.mcpack",
    murderDetectorV20: "murder_detector_v2.0.mcpack",

    customSkyOverlayV1: "file_name.mcpack", //todo

    betterBedrockBetterFogs: "better_bedrock_better_fogs.mcpack",
    betterBedrockCleanGlass: "better_bedrock_clean_glass.mcpack",
    betterBedrockCleanWater: "better_bedrock_clean_water.mcpack",
    betterBedrockDarkMode: "better_bedrock_dark_mode.mcpack",
    betterBedrockDarkUI: "better_bedrock_dark_ui.mcpack",
    betterBedrockFullGrass: "better_bedrock_full_grass.mcpack",
    betterBedrockLowFire: "better_bedrock_low_fire.mcpack",
    betterBedrockBetterBlocks: "better_bedrock_better_blocks.mcpack",
    betterBedrockWaypoints: "better_bedrock_waypoints.mcpack",
    betterBedrockParticleLimiter: "better_bedrock_particle_limiter.mcpack",
};

export interface DownloadsItemProps {
    title: string;
    description: string;
    downloadId: string;
    buttonType: "alwaysWhite" | "alwaysBlack" | "alwaysGreen";
    itemWeight: number;
    imageAssetUrl: string;
}

export interface DownloadsListProps {
    title: string;
    description: string;
    items: DownloadsItemProps[];
}

export const DOWNLOADS_LIST: DownloadsListProps[] = [
    {
        title: "Featured",
        description:
            "The latest main content for Better Bedrock is here. Enjoy playing Minecraft on a whole new level!",
        items: [
            {
                title: "Texture Pack v7.4",
                description: "Enhance your gameplay with multiple mods and adjustable options!",
                downloadId: DOWNLOADS_IDS.betterBedrockClientV74,
                buttonType: "alwaysGreen",
                itemWeight: 10.1,
                imageAssetUrl: "/static/images/logo",
            },
        ],
    },
    {
        title: "Extensions",
        description:
            "Extra packs that enhance your gameplay even further. Make sure to put packs above main textrue pack!",
        items: [
            {
                title: "Dark UI",
                description: "Changes most BB textures to darker ones",
                downloadId: DOWNLOADS_IDS.betterBedrockDarkUI,
                itemWeight: 0.011,
                buttonType: "alwaysWhite",
                imageAssetUrl: "/static/images/logo2",
            },
            {
                title: "Dark Mode",
                description: "Darker alternative to the vanilla textures",
                downloadId: DOWNLOADS_IDS.betterBedrockDarkMode,
                itemWeight: 4.69,
                buttonType: "alwaysWhite",
                imageAssetUrl: "/static/images/logo2",
            },
            {
                title: "Better Fogs",
                description: "Changes all fogs to make them unlimited and better for visibility",
                downloadId: DOWNLOADS_IDS.betterBedrockBetterFogs,
                itemWeight: 0.01,
                buttonType: "alwaysWhite",
                imageAssetUrl: "/static/images/logo2",
            },
            {
                title: "Waypoints",
                description:
                    "Adds ability to create vertical beams around world to improve  positioning",
                downloadId: DOWNLOADS_IDS.betterBedrockWaypoints,
                itemWeight: 0.015,
                buttonType: "alwaysWhite",
                imageAssetUrl: "/static/images/logo2",
            },
            {
                title: "Particle Limiter",
                description: "Adds ability to limit particles by 3 options: Disabled, Minimal, All",
                downloadId: DOWNLOADS_IDS.betterBedrockParticleLimiter,
                itemWeight: 0.109,
                buttonType: "alwaysWhite",
                imageAssetUrl: "/static/images/logo2",
            },
            {
                title: "Low Fire",
                description: "Adds lower fire texture on HUD to improve visibility",
                downloadId: DOWNLOADS_IDS.betterBedrockLowFire,
                itemWeight: 0.014,
                buttonType: "alwaysWhite",
                imageAssetUrl: "/static/images/logo2",
            },
            {
                title: "Full Grass",
                description: "Changes grass textures to make them look connected",
                downloadId: DOWNLOADS_IDS.betterBedrockFullGrass,
                itemWeight: 0.002,
                buttonType: "alwaysWhite",
                imageAssetUrl: "/static/images/logo2",
            },
            {
                title: "Clean Glass",
                description:
                    "Changes glass textures to make them look connected and less distracting",
                downloadId: DOWNLOADS_IDS.betterBedrockCleanGlass,
                itemWeight: 0.011,
                buttonType: "alwaysWhite",
                imageAssetUrl: "/static/images/logo2",
            },
            {
                title: "Clean Water",
                description: "Changes water textures to make them more clean and visible",
                downloadId: DOWNLOADS_IDS.betterBedrockCleanWater,
                itemWeight: 0.002,
                buttonType: "alwaysWhite",
                imageAssetUrl: "/static/images/logo2",
            },
        ],
    },
    {
        title: "Archived",
        description:
            "If you want to try older versions and enjoy old-school Better Bedrock B) then you have that possibility! Note that these packs, and software, are deprecated, and may not be stable.",
        items: [
            {
                title: "Mobile App 1.1.1",
                description:
                    "Our mobile app allows you to edit and save config and cape without any 3rd party applications.",
                downloadId: DOWNLOADS_IDS.betterBedrockApp,
                itemWeight: 27.74,
                buttonType: "alwaysBlack",
                imageAssetUrl: "/static/images/logo",
            },
            {
                title: "Client V1",
                description:
                    "Our Minecraft client for Windows 10/11. This client includes modules such as Zoom, FreeLook, No Hurt Cam, and more!",
                downloadId: DOWNLOADS_IDS.betterBedrockWindowsClientV1,
                itemWeight: 32.07,
                buttonType: "alwaysBlack",
                imageAssetUrl: "/static/images/logo",
            },
            {
                title: "Better Bedrock V6",
                description: "Archived and discontinued.",
                downloadId: DOWNLOADS_IDS.betterBedrockClientV6,
                itemWeight: 2.71,
                buttonType: "alwaysBlack",
                imageAssetUrl: "/static/images/logo",
            },
            {
                title: "Better Bedrock V5",
                description: "Archived and discontinued.",
                downloadId: DOWNLOADS_IDS.betterBedrockClientV5,
                itemWeight: 17.8,
                buttonType: "alwaysBlack",
                imageAssetUrl: "/static/images/logo",
            },
            {
                title: "Better Bedrock V5 Error Fix V2.0",
                description: "Archived and discontinued.",
                downloadId: DOWNLOADS_IDS.betterBedrockClientV5ErrorFix,
                itemWeight: 0.483,
                buttonType: "alwaysBlack",
                imageAssetUrl: "/static/images/logo",
            },
            {
                title: "Better Bedrock V5 Patch V1.2",
                description: "Archived and discontinued.",
                downloadId: DOWNLOADS_IDS.betterBedrockClientV5Patch,
                itemWeight: 0.483,
                buttonType: "alwaysBlack",
                imageAssetUrl: "/static/images/logo",
            },
            {
                title: "Better Bedrock V5 Config",
                description: "Archived and discontinued.",
                downloadId: DOWNLOADS_IDS.betterBedrockClientV5Config,
                itemWeight: 0.471,
                buttonType: "alwaysBlack",
                imageAssetUrl: "/static/images/logo",
            },
            {
                title: "Better Bedrock V4 Patch",
                description: "Archived and discontinued.",
                downloadId: DOWNLOADS_IDS.betterBedrockClientV4Patch,
                itemWeight: 0.486,
                buttonType: "alwaysBlack",
                imageAssetUrl: "/static/images/logo",
            },
            {
                title: "Better Bedrock V4 Lite",
                description: "Archived and discontinued.",
                downloadId: DOWNLOADS_IDS.betterBedrockClientV4Lite,
                itemWeight: 49.23,
                buttonType: "alwaysBlack",
                imageAssetUrl: "/static/images/logo",
            },
            {
                title: "Better Bedrock V4",
                description: "Archived and discontinued.",
                downloadId: DOWNLOADS_IDS.betterBedrockClientV4,
                itemWeight: 49.42,
                buttonType: "alwaysBlack",
                imageAssetUrl: "/static/images/logo",
            },
            {
                title: "Better Bedrock V3",
                description: "Archived and discontinued.",
                downloadId: DOWNLOADS_IDS.betterBedrockClientV3,
                itemWeight: 6.86,
                buttonType: "alwaysBlack",
                imageAssetUrl: "/static/images/logo",
            },
            {
                title: "Better Bedrock V2",
                description: "Archived and discontinued.",
                downloadId: DOWNLOADS_IDS.betterBedrockClientV2,
                itemWeight: 4.45,
                buttonType: "alwaysBlack",
                imageAssetUrl: "/static/images/logo",
            },
            {
                title: "Better Bedrock V1",
                description: "Archived and discontinued.",
                downloadId: DOWNLOADS_IDS.betterBedrockClientV1,
                itemWeight: 20.14,
                buttonType: "alwaysBlack",
                imageAssetUrl: "/static/images/logo",
            },
        ],
    },
];
