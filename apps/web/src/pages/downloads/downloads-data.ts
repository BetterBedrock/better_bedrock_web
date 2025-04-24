import redThemeThumbnail from "../../assets/images/themes_thumbnails/red.png";
import blueThemeThumbnail from "../../assets/images/themes_thumbnails/01mKBfz.png";
import murderDetectorThumbnail from "../../assets/images/side_projects_thumbnails/murde-detector.png";
import skyOverlayThumbnail from "../../assets/images/side_projects_thumbnails/sky-overlay.png";
import logo2 from "~/assets/images/logo2.png";

export const TAB_NAMES: string[] = ["Main", "Themes", "Side Projects"];

export const THEMES_LIST = [
    {
        title: "Blue UI",
        description: "Creator: @ayaanthe0ne",
        imageAssetUrl: blueThemeThumbnail,
    },
    {
        title: "Red UI",
        description: "Creator: @Deleted User#0000",
        imageAssetUrl: redThemeThumbnail,
    },
];

export const SIDE_PROJECTS_LIST = [
    {
        title: "Murder Detector+ v3.2",
        description: "Creator: @axmbro",
        imageAssetUrl: murderDetectorThumbnail,
    },
    {
        title: "Custom Sky Overlay",
        description: "Creator: @axmbro",
        imageAssetUrl: skyOverlayThumbnail,
    },
];

export const DOWNLOADS_IDS = {
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

export interface DownloadListProps {
    title: string;
    description: string;
    items: {
        title: string;
        description: string;
        downloadId: string;
        scaleImage: boolean;
        buttonType: "alwaysWhite" | "alwaysBlack" | "alwaysGreen";
        itemWeight: number;
        imageAssetUrl?: string;
    }[];
}

export const DOWNLOAD_LIST: DownloadListProps[] = [
    {
        title: "Featured",
        description:
            "The latest main content for Better Bedrock is here. Enjoy playing Minecraft on a whole new level!",
        items: [
            {
                title: "Texture Pack v7.4",
                description: "Enhance your gameplay with multiple mods and adjustable options!",
                downloadId: DOWNLOADS_IDS.betterBedrockClientV74,
                scaleImage: true,
                buttonType: "alwaysGreen",
                itemWeight: 10.1,
            },
        ],
    },
    // {
    //   title: "Side Projects",
    //   description: "Side projects extend your gameplay in many more ways. It offers new possibilities with extra content!",
    //   items: [
    //     {
    //       title: "Murder Detector+ v3.2",
    //       description: "Highlights both roles, murderer and sheriff giving you unfair advantage. Use at your own risk!",
    //       downloadId: DOWNLOADS_IDS.murderDetectorV32,
    //       scaleImage: true,
    //       itemWeight: 0.009,
    //       imageAssetUrl: "assets/images/downloads/murder_detector.png",
    //       buttonType: "alwaysBlack",
    //     },
    //     {
    //       title: "Custom Sky Overlay",
    //       description: "todo",
    //       downloadId: DOWNLOADS_IDS.customSkyOverlayV1,
    //       scaleImage: true,
    //       itemWeight: 90.0,
    //       imageAssetUrl: "assets/images/downloads/custom_sky_overlay.png",
    //       buttonType: "alwaysBlack",
    //     },
    //   ],
    // },
    {
        title: "Extensions",
        description:
            "Extra packs that enhance your gameplay even further. Make sure to put packs above main textrue pack!",
        items: [
            {
                title: "Dark UI",
                description: "Changes most BB textures to darker ones",
                downloadId: DOWNLOADS_IDS.betterBedrockDarkUI,
                scaleImage: true,
                itemWeight: 0.011,
                buttonType: "alwaysWhite",
                imageAssetUrl: logo2,
            },
            {
                title: "Dark Mode",
                description: "Darker alternative to the vanilla textures",
                downloadId: DOWNLOADS_IDS.betterBedrockDarkMode,
                scaleImage: true,
                itemWeight: 4.69,
                buttonType: "alwaysWhite",
                imageAssetUrl: logo2,
            },
            {
                title: "Better Fogs",
                description: "Changes all fogs to make them unlimited and better for visibility",
                downloadId: DOWNLOADS_IDS.betterBedrockBetterFogs,
                scaleImage: true,
                itemWeight: 0.01,
                buttonType: "alwaysWhite",
                imageAssetUrl: logo2,
            },
            {
                title: "Waypoints",
                description: "Adds ability to create vertical beams around world to improve  positioning",
                downloadId: DOWNLOADS_IDS.betterBedrockWaypoints,
                scaleImage: true,
                itemWeight: 0.015,
                buttonType: "alwaysWhite",
                imageAssetUrl: logo2,
            },
            {
                title: "Particle Limiter",
                description: "Adds ability to limit particles by 3 options: Disabled, Minimal, All",
                downloadId: DOWNLOADS_IDS.betterBedrockParticleLimiter,
                scaleImage: true,
                itemWeight: 0.109,
                buttonType: "alwaysWhite", imageAssetUrl: logo2,
            },
            {
                title: "Low Fire",
                description: "Adds lower fire texture on HUD to improve visibility",
                downloadId: DOWNLOADS_IDS.betterBedrockLowFire,
                scaleImage: true,
                itemWeight: 0.014,
                buttonType: "alwaysWhite", imageAssetUrl: logo2,
            },
            {
                title: "Full Grass",
                description: "Changes grass textures to make them look connected",
                downloadId: DOWNLOADS_IDS.betterBedrockFullGrass,
                scaleImage: true,
                itemWeight: 0.002,
                buttonType: "alwaysWhite", imageAssetUrl: logo2,
            },
            {
                title: "Clean Glass",
                description: "Changes glass textures to make them look connected and less distracting",
                downloadId: DOWNLOADS_IDS.betterBedrockCleanGlass,
                scaleImage: true,
                itemWeight: 0.011,
                buttonType: "alwaysWhite", imageAssetUrl: logo2,
            },
            {
                title: "Clean Water",
                description: "Changes water textures to make them more clean and visible",
                downloadId: DOWNLOADS_IDS.betterBedrockCleanWater,
                scaleImage: true,
                itemWeight: 0.002,
                buttonType: "alwaysWhite", imageAssetUrl: logo2,
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
                scaleImage: true,
                itemWeight: 27.74,
                buttonType: "alwaysBlack",
            },
            {
                title: "Client V1",
                description:
                    "Our Minecraft client for Windows 10/11. This client includes modules such as Zoom, FreeLook, No Hurt Cam, and more!",
                downloadId: DOWNLOADS_IDS.betterBedrockWindowsClientV1,
                scaleImage: true,
                itemWeight: 32.07,
                buttonType: "alwaysBlack",
            },
            {
                title: "Better Bedrock V6",
                description: "Archived and discontinued.",
                downloadId: DOWNLOADS_IDS.betterBedrockClientV6,
                scaleImage: true,
                itemWeight: 2.71,
                buttonType: "alwaysBlack",
            },
            {
                title: "Better Bedrock V5",
                description: "Archived and discontinued.",
                downloadId: DOWNLOADS_IDS.betterBedrockClientV5,
                scaleImage: true,
                itemWeight: 17.8,
                buttonType: "alwaysBlack",
            },
            {
                title: "Better Bedrock V5 Error Fix V2.0",
                description: "Archived and discontinued.",
                downloadId: DOWNLOADS_IDS.betterBedrockClientV5ErrorFix,
                scaleImage: true,
                itemWeight: 0.483,
                buttonType: "alwaysBlack",
            },
            {
                title: "Better Bedrock V5 Patch V1.2",
                description: "Archived and discontinued.",
                downloadId: DOWNLOADS_IDS.betterBedrockClientV5Patch,
                scaleImage: true,
                itemWeight: 0.483,
                buttonType: "alwaysBlack",
            },
            {
                title: "Better Bedrock V5 Config",
                description: "Archived and discontinued.",
                downloadId: DOWNLOADS_IDS.betterBedrockClientV5Config,
                scaleImage: true,
                itemWeight: 0.471,
                buttonType: "alwaysBlack",
            },
            {
                title: "Better Bedrock V4 Patch",
                description: "Archived and discontinued.",
                downloadId: DOWNLOADS_IDS.betterBedrockClientV4Patch,
                scaleImage: true,
                itemWeight: 0.486,
                buttonType: "alwaysBlack",
            },
            {
                title: "Better Bedrock V4 Lite",
                description: "Archived and discontinued.",
                downloadId: DOWNLOADS_IDS.betterBedrockClientV4Lite,
                scaleImage: true,
                itemWeight: 49.23,
                buttonType: "alwaysBlack",
            },
            {
                title: "Better Bedrock V4",
                description: "Archived and discontinued.",
                downloadId: DOWNLOADS_IDS.betterBedrockClientV4,
                scaleImage: true,
                itemWeight: 49.42,
                buttonType: "alwaysBlack",
            },
            {
                title: "Better Bedrock V3",
                description: "Archived and discontinued.",
                downloadId: DOWNLOADS_IDS.betterBedrockClientV3,
                scaleImage: true,
                itemWeight: 6.86,
                buttonType: "alwaysBlack",
            },
            {
                title: "Better Bedrock V2",
                description: "Archived and discontinued.",
                downloadId: DOWNLOADS_IDS.betterBedrockClientV2,
                scaleImage: true,
                itemWeight: 4.45,
                buttonType: "alwaysBlack",
            },
            {
                title: "Better Bedrock V1",
                description: "Archived and discontinued.",
                downloadId: DOWNLOADS_IDS.betterBedrockClientV1,
                scaleImage: true,
                itemWeight: 20.14,
                buttonType: "alwaysBlack",
            },
        ],
    },
];
