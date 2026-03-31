import { DownloadsCategoryDto } from "@/shared/config/dto/downloads-category.dto";

export enum PROJECT_TYPES {
    texturepacks = "Texture packs",
    addons = "Addons",
    scripts = "Scripts",
    maps = "Maps",
    skinPacks = "Skin packs",
    other = "Other",
}

export type ProjectTypeKey = keyof typeof PROJECT_TYPES;

export interface BedrockDownloadPage {
    details: {
        type: ProjectTypeKey | undefined;
        url: string;
        clean: string;
    };
    title: string;
    description: string;
}

export const bedrockDownloadPages: BedrockDownloadPage[] = [
    {
        details: {
            type: undefined,
            url: "mods",
            clean: "All",
        },
        title: "Minecraft Bedrock Mods, Texture Packs, Maps, Skins & More",
        description:
            "Discover and download the best Minecraft Bedrock mods, addons, and modifications. Browse our extensive collection of quality content for Bedrock Edition.",
    },
    {
        details: {
            type: "texturepacks",
            url: "texture-packs",
            clean: "Texture Packs",
        },
        title: "Minecraft Bedrock Texture Packs | Resource Packs Download",
        description:
            "Download Minecraft Bedrock texture packs and resource packs. Improve graphics, change textures, and customize the look of Minecraft Bedrock Edition with high-quality packs.",
    },
    {
        details: {
            type: "addons",
            url: "addons",
            clean: "Addons",
        },
        title: "Minecraft Bedrock Addons | Mods & Add-Ons Download",
        description:
            "Download the best Minecraft Bedrock addons and mods. Add new mobs, items, biomes, and gameplay features to Minecraft Bedrock Edition with free add-ons.",
    },
    {
        details: {
            type: "scripts",
            url: "scripts",
            clean: "Scripts",
        },
        title: "Minecraft Bedrock Scripts | Behavior Packs & Script API",
        description:
            "Download Minecraft Bedrock scripts and behavior packs using the Script API. Add custom mechanics, commands, automation, and server features to Minecraft Bedrock Edition.",
    },
    {
        details: {
            type: "maps",
            url: "maps",
            clean: "Maps",
        },
        title:
            "Minecraft Bedrock Maps | Adventure, Survival, Parkour & Minigame Maps",
        description:
            "Download Minecraft Bedrock maps including adventure, survival, parkour, and minigame maps. Explore new worlds and custom creations for Minecraft Bedrock Edition.",

    },
    {
        details: {
            type: "skinPacks",
            url: "skin-packs",
            clean: "Skin Packs",
        },
        title: "Minecraft Bedrock Skins & Skin Packs | Download Custom Skins",
        description:
            "Download Minecraft Bedrock skins and skin packs. Customize your character with cool, cute, HD, and themed skins for Minecraft Bedrock Edition.",

    },
    {
        details: {
            type: "other",
            url: "other",
            clean: "Other",
        },
        title: "Minecraft Bedrock Mods, Shaders, Seeds, UI Packs & More",
        description:
            "Discover Minecraft Bedrock shaders, UI packs, seeds, tools, and other content. Find more ways to customize Minecraft Bedrock Edition.",
    }
];

export const SIDE_PROJECTS_LIST = [
    "murder_detector",
    "custom_sky_overlay",
    "settings_gap_remover",
    "animated_hotbar_selector",
    "marketplace_button_remover",
    "durability_viewer",
    "inventory_durability_viewer",
    "better_chat",
    "inventory_hud",
    "dark_mode",
    "hd_font"
];

export const MAIN_LIST: DownloadsCategoryDto = {
    id: "main",
    name: "Main",
    lists: [
        {
            title: "Featured",
            description:
                "Enjoy playing Minecraft on a whole new level using the latest version of the main texture pack!",
            items: [
                {
                    description: "Enhance your gameplay with multiple mods and adjustable options!",
                    projectId: "better_bedrock_texture_pack",
                    buttonType: "green",
                    type: "green",
                },
            ],
        },
        {
            title: "Extensions",
            description:
                "Explore extra packs that enhance your gameplay even further. Make sure to put these packs in the correct order. Yellow ones require the main BB pack to work, while orange ones can be used without it.",
            items: [
                {
                    description:
                        "Adds the ability to create vertical beams around the world to improve positioning",
                    projectId: "waypoints",
                    buttonType: "dark",
                    type: "yellow",
                },
                {
                    description:
                        "Improves gameplay by adding extra particles each time the player is hit!",
                    projectId: "hit_particles",
                    buttonType: "dark",
                    type: "yellow",
                },
                {
                    description:
                        "Changes all fogs to make them unlimited and improve visibility",
                    projectId: "better_fogs",
                    buttonType: "dark",
                    type: "yellow",
                },
                {
                    description:
                        "Brings a special filter to the Lightener module, providing better visibility, similar to night vision! It doesn't work with all devices/graphics engines",
                    projectId: "lightener_night_vision",
                    buttonType: "dark",
                    type: "yellow",
                },
                {
                    description: "Changes most BB textures to darker ones",
                    projectId: "dark_ui",
                    buttonType: "dark",
                    type: "yellow",
                },
                {

                    description: "Changes water textures to make them cleaner and more visible",
                    projectId: "clean_water",
                    buttonType: "dark",
                    type: "yellow",
                },
                {
                    description: "Darker alternative to the vanilla textures",
                    projectId: "dark_mode",
                    buttonType: "dark",
                    type: "orange",
                },
                {
                    description: "Adds lower fire texture on HUD to improve visibility",
                    projectId: "low_fire",
                    buttonType: "dark",
                    type: "orange",
                },
                {
                    description:
                        "Adds ability to limit particles by 3 options: Disabled, Minimal, All",
                    projectId: "particle_limiter",
                    buttonType: "dark",
                    type: "orange",
                },
                {
                    description:
                        "Gives ability to adjust colors of the enchant glint!",
                    projectId: "enchant_glint_switcher",
                    buttonType: "dark",
                    type: "orange",
                },
                {
                    description: "Changes grass textures to make them look connected",
                    projectId: "full_grass",
                    buttonType: "dark",
                    type: "orange",
                },
                {
                    description:
                        "Changes glass textures to make them look connected and less distracting",
                    projectId: "clean_glass",
                    buttonType: "dark",
                    type: "orange",
                },

            ],
        },
        {
            title: "Archived",
            description:
                "If you want to try older versions and enjoy old-school Better Bedrock B), then you have that option! Note that these packs and software are deprecated and may not be stable. We also save only the main content, so you cannot find older extension packs here.",
            items: [
                {
                    description: "Archived and discontinued.",
                    projectId: "better_bedrock_texture_pack_v7.4",
                    buttonType: "white",
                    type: "white",
                },
                {
                    description: "Archived and discontinued.",
                    projectId: "better_bedrock_texture_pack_v6",
                    buttonType: "white",
                    type: "white",

                },
                {
                    description: "Archived and discontinued.",
                    projectId: "better_bedrock_texture_pack_v5",
                    buttonType: "white",
                    type: "white",

                },
                {
                    description: "Archived and discontinued.",
                    projectId: "better_bedrock_client_v5_error_fix_2.0",
                    buttonType: "white",
                    type: "white",

                },
                {
                    description: "Archived and discontinued.",
                    projectId: "better_bedrock_client_v5_patch",
                    buttonType: "white",
                    type: "white",

                },
                {
                    description: "Archived and discontinued.",
                    projectId: "better_bedrock_client_v5_config",
                    buttonType: "white",
                    type: "white",

                },
                {
                    description: "Archived and discontinued.",
                    projectId: "better_bedrock_client_v4_patch",
                    buttonType: "white",
                    type: "white",

                },
                {
                    description: "Archived and discontinued.",
                    projectId: "better_bedrock_client_v4_lite",
                    buttonType: "white",
                    type: "white",

                },
                {
                    description: "Archived and discontinued.",
                    projectId: "better_bedrock_client_v4",
                    buttonType: "white",
                    type: "white",

                },
                {
                    description: "Archived and discontinued.",
                    projectId: "better_bedrock_client_v3",
                    buttonType: "white",
                    type: "white",

                },
                {
                    description: "Archived and discontinued.",
                    projectId: "better_bedrock_client_v2",
                    buttonType: "white",
                    type: "white",
                },
                {
                    description: "Archived and discontinued.",
                    projectId: "better_bedrock_client_v1",
                    buttonType: "white",
                    type: "white",

                },
            ],
        },
    ],
};
