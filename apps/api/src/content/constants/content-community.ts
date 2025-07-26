import { DownloadsListDto } from "src/download/dto/downloads-list.dto";

export const COMMUNITY_LIST: DownloadsListDto[] = [
    {
        title: "Community",
        description:
            "Explore a variety of themes and configs made by the community of Better Bedrock users.",
        buttons: [
            {
                type: "alwaysBlack",
                text: "Submit YOUR texturepack",
                notification: {
                    title: "Texturepack submission",
                    description:
                        "Please submit your texturepack on our Discord server on #submissions",
                    type: "info",
                },
            },
            {
                type: "alwaysWhite",
                text: "Watch theme creation tutorial",
                link: "https://updateitlater.com",
            },
        ],
        items: [
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
                buttonType: "alwaysWhite",
                itemWeight: 0,
            },
            {
                title: "Red UI",
                creator: "Deleted User#0000",
                description: "A red-themed UI for Better Bedrock.",
                imageAssetUrl: [
                    "/static/images/themes/v7-4/red_ui/1.png",
                    "/static/images/themes/v7-4/red_ui/2.png",
                    "/static/images/themes/v7-4/red_ui/3.png",
                    "/static/images/themes/v7-4/red_ui/4.png",
                    "/static/images/themes/v7-4/red_ui/5.png",
                ],
                downloadId: "red_ui.mcpack",
                buttonType: "alwaysWhite",
                itemWeight: 0,
            },
            {
                title: "Cherry Theme",
                creator: "montezu_22",
                description: "A cherry-themed UI for Better Bedrock.",
                imageAssetUrl: [
                    "/static/images/themes/v7-4/cherry_theme/1.png",
                    "/static/images/themes/v7-4/cherry_theme/2.png",
                    "/static/images/themes/v7-4/cherry_theme/3.png",
                    "/static/images/themes/v7-4/cherry_theme/4.png",
                    "/static/images/themes/v7-4/cherry_theme/5.png",
                ],
                downloadId: "cherry_ui.mcpack",
                buttonType: "alwaysWhite",
                itemWeight: 0,
            },
        ],
    },
];
