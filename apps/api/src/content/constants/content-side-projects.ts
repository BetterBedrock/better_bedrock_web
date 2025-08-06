import { DownloadsCategoryDto } from "src/download/dto/downloads-category.dto";

export const SIDE_PROJECTS_DOWNLOADS_IDS = {
    murderDetector: "murder_detector.mcpack",
    customSkyOverlay: "custom_sky_overlay.mcpack",
};

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
                            "Please submit your side project to our Discord server on #tickets.",
                        type: "info",
                    },
                },
            ],
            items: [
                {
                    title: "Murder Detector+ v3.2",
                    creator: "axmbro",
                    description:
                        "Simple pack that have double check for murderer items, if it detects it, then it renders adjustable icons above player heads.",
                    imageAssetUrl: [
                        "/static/images/side_projects/murder-detector.png",
                        "/static/images/side_projects/murder-detector1.png",
                        "/static/images/side_projects/murder-detector2.png",
                        "/static/images/side_projects/murder-detector3.png",
                        "/static/images/side_projects/murder-detector4.png",
                    ],
                    downloadId: SIDE_PROJECTS_DOWNLOADS_IDS.murderDetector,
                    buttonType: "white",
                    itemWeight: 0.08,
                    tags: ["MCBE v1.17.0+"],
                },
                {
                    title: "Custom Sky Overlay",
                    creator: "axmbro",
                    description: "Collection of 16 custom skys. Adjust them using subpacks.",
                    imageAssetUrl: [
                        "/static/images/side_projects/sky-overlay.png",
                        "/static/images/side_projects/sky-overlay1.png",
                        "/static/images/side_projects/sky-overlay2.png",
                        "/static/images/side_projects/sky-overlay3.png",
                        "/static/images/side_projects/sky-overlay4.png",
                        "/static/images/side_projects/sky-overlay5.png",
                        "/static/images/side_projects/sky-overlay6.png",
                        "/static/images/side_projects/sky-overlay7.png",
                        "/static/images/side_projects/sky-overlay8.png",
                    ],
                    downloadId: SIDE_PROJECTS_DOWNLOADS_IDS.customSkyOverlay,
                    buttonType: "white",
                    itemWeight: 89.3,
                    tags: ["MCBE v1.13.0+"],
                },
            ],
        },
    ],
};
