import { DownloadsCategoryDto } from "src/download/dto/downloads-category.dto";

export const SIDE_PROJECTS_LIST: DownloadsCategoryDto = {
    id: "sideProjects",
    name: "Side Projects",
    lists: [
        {
            title: "Side Projects",
            description:
                "Side projects extend your gameplay in many more ways. It offers new possibilities with extra content!.",
            buttons: [
                {
                    type: "green",
                    text: "Submit YOUR side project",
                    notification: {
                        title: "Side project submission",
                        description:
                            "Please submit your side project to our Discord server on #submissions.",
                        type: "info",
                    },
                },
            ],
            items: [
                {
                    title: "Murder Detector+ v3.2",
                    creator: "axmbro",
                    description: "Todo;",
                    imageAssetUrl: ["/static/images/side_projects/murder-detector.png"],
                    downloadId: "murder_detector.mcpack",
                    buttonType: "white",
                    itemWeight: 0,
                },
                {
                    title: "Custom Sky Overlay",
                    creator: "axmbro",
                    description: "Todo;",
                    imageAssetUrl: ["/static/images/side_projects/sky-overlay.png"],
                    downloadId: "custom_sky_overlay.mcpack",
                    buttonType: "white",
                    itemWeight: 0,
                },
            ],
        },
    ],
};
