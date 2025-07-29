import { DownloadsCategoryDto } from "src/download/dto/downloads-category.dto";

// todo: update theme files on server
export const COMMUNITY_LIST: DownloadsCategoryDto[] = {
    id: "community",
    name: "Community",
    lsits: [
        {
            title: "Community",
            description:
                "Explore a variety of themes and configs made by the community of Better Bedrock users.",
            buttons: [
                {
                    type: "green",
                    text: "Submit YOUR texturepack",
                    notification: {
                        title: "Texturepack submission",
                        description:
                            "Please submit your texturepack on our Discord server on #submissions",
                        type: "info",
                    },
                },
                {
                    type: "white",
                    text: "Watch theme creation tutorial",
                    link: "https://updateitlater.com",
                },
            ],
            items: [
                {
                    title: "Blue UI v2",
                    creator: "ayaanthe0ne",
                    description: "A blue-themed UI for Better Bedrock.",
                    imageAssetUrl: [
                        "/static/images/themes/v8/blue_ui/1.png",
                        "/static/images/themes/v8/blue_ui/2.png",
                        "/static/images/themes/v8/blue_ui/3.png",
                        "/static/images/themes/v8/blue_ui/4.png",
                        "/static/images/themes/v8/blue_ui/5.png",
                    ],
                    downloadId: "blue_ui_v2.mcpack", // update
                    buttonType: "white",
                    itemWeight: 0,
                },
                {
                    title: "Cherry Theme v2",
                    creator: "notmadann",
                    description: "A cherry-themed UI for Better Bedrock.",
                    imageAssetUrl: [
                        "/static/images/themes/v8/cherry_theme/1.png",
                        "/static/images/themes/v8/cherry_theme/2.png",
                        "/static/images/themes/v8/cherry_theme/3.png",
                        "/static/images/themes/v8/cherry_theme/4.png",
                        "/static/images/themes/v8/cherry_theme/5.png",
                    ],
                    downloadId: "cherry_ui_v2.mcpack", // update
                    buttonType: "white",
                    itemWeight: 0,
                },
                {
                    title: "High Contrast v2",
                    creator: "jarvis0002",
                    description: "A high-contrast UI for Better Bedrock.",
                    imageAssetUrl: [
                        "/static/images/themes/v8/high_contrast/1.png",
                        "/static/images/themes/v8/high_contrast/2.png",
                        "/static/images/themes/v8/high_contrast/3.png",
                        "/static/images/themes/v8/high_contrast/4.png",
                        "/static/images/themes/v8/high_contrast/5.png",
                    ],
                    downloadId: "high_contrast_v2.mcpack", // update
                    buttonType: "white",
                    itemWeight: 0,
                },
                {
                    title: "Light Dark UI v2",
                    creator: "profox3333",
                    description: "A light-dark UI for Better Bedrock.",
                    imageAssetUrl: [
                        "/static/images/themes/v8/light_dark_ui/1.png",
                        "/static/images/themes/v8/light_dark_ui/2.png",
                        "/static/images/themes/v8/light_dark_ui/3.png",
                        "/static/images/themes/v8/light_dark_ui/4.png",
                        "/static/images/themes/v8/light_dark_ui/5.png",
                    ],
                    downloadId: "light_dark_ui_v2.mcpack", // update
                    buttonType: "white",
                    itemWeight: 0,
                },
                {
                    title: "Purple Theme v2",
                    creator: "profox3333",
                    description: "A purple-theme UI for Better Bedrock.",
                    imageAssetUrl: [
                        "/static/images/themes/v8/purple_theme/1.png",
                        "/static/images/themes/v8/purple_theme/2.png",
                        "/static/images/themes/v8/purple_theme/3.png",
                        "/static/images/themes/v8/purple_theme/4.png",
                        "/static/images/themes/v8/purple_theme/5.png",
                    ],
                    downloadId: "purple_theme_v2.mcpack", // update
                    buttonType: "white",
                    itemWeight: 0,
                },
                {
                    title: "Red UI v2",
                    creator: "unknown",
                    description: "A red-themed UI for Better Bedrock.",
                    imageAssetUrl: [
                        "/static/images/themes/v8/red_ui/1.png",
                        "/static/images/themes/v8/red_ui/2.png",
                        "/static/images/themes/v8/red_ui/3.png",
                        "/static/images/themes/v8/red_ui/4.png",
                        "/static/images/themes/v8/red_ui/5.png",
                    ],
                    downloadId: "red_ui_v2.mcpack", // update
                    buttonType: "white",
                    itemWeight: 0,
                },
                {
                    title: "Blue UI",
                    creator: "ayaanthe0ne",
                    description: "A blue-themed UI for Better Bedrock.",
                    imageAssetUrl: [
                        "/static/images/themes/v7-4/blue_ui/1.png",
                        "/static/images/themes/v7-4/blue_ui/2.png",
                        "/static/images/themes/v7-4/blue_ui/3.png",
                        "/static/images/themes/v7-4/blue_ui/4.png",
                        "/static/images/themes/v7-4/blue_ui/5.png",
                    ],
                    downloadId: "blue_ui.mcpack",
                    buttonType: "white",
                    itemWeight: 0,
                },
                {
                    title: "Red UI",
                    creator: "unknown",
                    description: "A red-themed UI for Better Bedrock.",
                    imageAssetUrl: [
                        "/static/images/themes/v7-4/red_ui/1.png",
                        "/static/images/themes/v7-4/red_ui/2.png",
                        "/static/images/themes/v7-4/red_ui/3.png",
                        "/static/images/themes/v7-4/red_ui/4.png",
                        "/static/images/themes/v7-4/red_ui/5.png",
                    ],
                    downloadId: "red_ui.mcpack",
                    buttonType: "white",
                    itemWeight: 0,
                },
                {
                    title: "Cherry Theme",
                    creator: "notmadann",
                    description: "A cherry-themed UI for Better Bedrock.",
                    imageAssetUrl: [
                        "/static/images/themes/v7-4/cherry_theme/1.png",
                        "/static/images/themes/v7-4/cherry_theme/2.png",
                        "/static/images/themes/v7-4/cherry_theme/3.png",
                        "/static/images/themes/v7-4/cherry_theme/4.png",
                        "/static/images/themes/v7-4/cherry_theme/5.png",
                    ],
                    downloadId: "cherry_ui.mcpack",
                    buttonType: "white",
                    itemWeight: 0,
                },
                {
                    title: "Light Dark UI",
                    creator: "profox3333",
                    description: "A light-dark UI for Better Bedrock.",
                    imageAssetUrl: [
                        "/static/images/themes/v7-4/light_dark_ui/1.png",
                        "/static/images/themes/v7-4/light_dark_ui/2.png",
                        "/static/images/themes/v7-4/light_dark_ui/3.png",
                        "/static/images/themes/v7-4/light_dark_ui/4.png",
                        "/static/images/themes/v7-4/light_dark_ui/5.png",
                    ],
                    downloadId: "light_dark_ui.mcpack", // update
                    buttonType: "white",
                    itemWeight: 0,
                },
                {
                    title: "High Contrast",
                    creator: "jarvis0002",
                    description: "A high-contrast UI for Better Bedrock.",
                    imageAssetUrl: [
                        "/static/images/themes/v7-4/high_contrast/1.png",
                        "/static/images/themes/v7-4/high_contrast/2.png",
                        "/static/images/themes/v7-4/high_contrast/3.png",
                        "/static/images/themes/v7-4/high_contrast/4.png",
                        "/static/images/themes/v7-4/high_contrast/5.png",
                    ],
                    downloadId: "high_contrast.mcpack", // update
                    buttonType: "white",
                    itemWeight: 0,
                },
                {
                    title: "Purple Theme",
                    creator: "profox3333",
                    description: "A purple-theme UI for Better Bedrock.",
                    imageAssetUrl: [
                        "/static/images/themes/v7-4/purple_theme/1.png",
                        "/static/images/themes/v7-4/purple_theme/2.png",
                        "/static/images/themes/v7-4/purple_theme/3.png",
                        "/static/images/themes/v7-4/purple_theme/4.png",
                        "/static/images/themes/v7-4/purple_theme/5.png",
                    ],
                    downloadId: "purple_theme.mcpack", // update
                    buttonType: "white",
                    itemWeight: 0,
                },
                {
                    title: "Amoled Dark UI",
                    creator: "vigilante_katsu_xx",
                    description: "A amoled-dark UI for Better Bedrock.",
                    imageAssetUrl: [
                        "/static/images/themes/v7-4/amoled_dark_ui/1.png",
                        "/static/images/themes/v7-4/amoled_dark_ui/2.png",
                        "/static/images/themes/v7-4/amoled_dark_ui/3.png",
                        "/static/images/themes/v7-4/amoled_dark_ui/4.png",
                        "/static/images/themes/v7-4/amoled_dark_ui/5.png",
                    ],
                    downloadId: "amoled_dark_ui.mcpack", // update
                    buttonType: "white",
                    itemWeight: 0,
                },
                {
                    title: "Classic Blue",
                    creator: "unknown",
                    description: "A classic-blue UI for Better Bedrock.",
                    imageAssetUrl: [
                        "/static/images/themes/v7-4/classic_blue/1.png",
                        "/static/images/themes/v7-4/classic_blue/2.png",
                        "/static/images/themes/v7-4/classic_blue/3.png",
                        "/static/images/themes/v7-4/classic_blue/4.png",
                        "/static/images/themes/v7-4/classic_blue/5.png",
                    ],
                    downloadId: "classic_blue.mcpack", // update
                    buttonType: "white",
                    itemWeight: 0,
                },
                {
                    title: "Montezu's Theme",
                    creator: "montezu_22",
                    description: "A UI for Better Bedrock.",
                    imageAssetUrl: [
                        "/static/images/themes/v7-4/montezu_s_theme/1.png",
                        "/static/images/themes/v7-4/montezu_s_theme/2.png",
                        "/static/images/themes/v7-4/montezu_s_theme/3.png",
                        "/static/images/themes/v7-4/montezu_s_theme/4.png",
                        "/static/images/themes/v7-4/montezu_s_theme/5.png",
                    ],
                    downloadId: "montezu_s_theme.mcpack", // update
                    buttonType: "white",
                    itemWeight: 0,
                },
                {
                    title: "Copper Orange",
                    creator: "notmadann",
                    description: "A copper-orange UI for Better Bedrock.",
                    imageAssetUrl: [
                        "/static/images/themes/v7-4/copper_orange/1.png",
                        "/static/images/themes/v7-4/copper_orange/2.png",
                        "/static/images/themes/v7-4/copper_orange/3.png",
                        "/static/images/themes/v7-4/copper_orange/4.png",
                        "/static/images/themes/v7-4/copper_orange/5.png",
                    ],
                    downloadId: "copper_orange.mcpack", // update
                    buttonType: "white",
                    itemWeight: 0,
                },
                {
                    title: "Oxidized Copper",
                    creator: "notmadann",
                    description: "A oxidized-copper UI for Better Bedrock.",
                    imageAssetUrl: [
                        "/static/images/themes/v7-4/oxidized_copper/1.png",
                        "/static/images/themes/v7-4/oxidized_copper/2.png",
                        "/static/images/themes/v7-4/oxidized_copper/3.png",
                        "/static/images/themes/v7-4/oxidized_copper/4.png",
                        "/static/images/themes/v7-4/oxidized_copper/5.png",
                    ],
                    downloadId: "oxidized_copper.mcpack", // update
                    buttonType: "white",
                    itemWeight: 0,
                },
                {
                    title: "Futuristic UI",
                    creator: "onlyrmoura",
                    description: "A Futuristic UI for Better Bedrock.",
                    imageAssetUrl: [
                        "/static/images/themes/v7-4/futuristic_ui/1.png",
                        "/static/images/themes/v7-4/futuristic_ui/2.png",
                        "/static/images/themes/v7-4/futuristic_ui/3.png",
                        "/static/images/themes/v7-4/futuristic_ui/4.png",
                        "/static/images/themes/v7-4/futuristic_ui/5.png",
                    ],
                    downloadId: "futuristic_ui.mcpack", // update
                    buttonType: "white",
                    itemWeight: 0,
                },
                {
                    title: "5WC",
                    creator: "onlyrmoura",
                    description: "A 5WC for Better Bedrock.",
                    imageAssetUrl: [
                        "/static/images/themes/v7-4/5wc/1.png",
                        "/static/images/themes/v7-4/5wc/2.png",
                        "/static/images/themes/v7-4/5wc/3.png",
                        "/static/images/themes/v7-4/5wc/4.png",
                        "/static/images/themes/v7-4/5wc/5.png",
                    ],
                    downloadId: "5wc_ui.mcpack", // update
                    buttonType: "white",
                    itemWeight: 0,
                },
            ],
        }
    ]
}
