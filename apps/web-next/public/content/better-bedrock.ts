import { DownloadsCategoryDto } from "@/public/content/dto/downloads-category.dto";

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
                "Enjoy playing Minecraft on a whole new level using latest version of the main texture pack!",
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
                "Extra packs that enhance your gameplay even further. Make sure to put these packs in correct order. Yellow ones require main BB pack to work, while orange ones can be used without it.",
            items: [
                {
                    description:
                        "Brings special filter to the Lightener module, providing better visibility, similar to night vision! Doesn't work with all devices/graphic engines",
                    projectId: "lightener_night_vision",
                    buttonType: "dark",
                    type: "yellow",
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
                    description: "Darker alternative to the vanilla textures",
                    projectId: "dark_mode",
                    buttonType: "dark",
                    type: "orange",
                },
                {
                    description: "Changes most BB textures to darker ones",
                    projectId: "dark_ui",
                    buttonType: "dark",
                    type: "yellow",
                },
                {
                    description: "Changes grass textures to make them look connected",
                    projectId: "full_grass",
                    buttonType: "dark",
                    type: "orange",
                },
                {
                    description:
                        "Changes all fogs to make them unlimited and better for visibility",
                    projectId: "better_fogs",
                    buttonType: "dark",
                    type: "yellow",
                },
                {
                    description:
                        "Changes glass textures to make them look connected and less distracting",
                    projectId: "clean_glass",
                    buttonType: "dark",
                    type: "orange",
                },
                {

                    description: "Changes water textures to make them more clean and visible",
                    projectId: "clean_water",
                    buttonType: "dark",
                    type: "yellow",
                },
                {
                    description:
                        "Adds ability to create vertical beams around world to improve positioning",
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
            ],
        },
        {
            title: "Archived",
            description:
                "If you want to try older versions and enjoy old-school Better Bedrock B) then you have that possibility! Note that these packs, and software, are deprecated, and may not be stable. We also save main content, so you cannot find here older extension packs.",
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
