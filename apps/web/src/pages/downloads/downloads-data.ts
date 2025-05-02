import redThemeThumbnail from "~/assets/images/themes_files/red_ui/1.png";
import blueThemeThumbnail from "~/assets/images/themes_files/blue_ui/1.png";
import murderDetectorThumbnail from "~/assets/images/side_projects_thumbnails/murde-detector.png";
import skyOverlayThumbnail from "~/assets/images/side_projects_thumbnails/sky-overlay.png";
import cherryThemeThumbnail from "~/assets/images/themes_files/cherry_theme/1.png";

export const TAB_NAMES: string[] = ["Main", "Community", "Side Projects"];
export const COMMUNITY_TAB_NAMES: string[] = ["Themes", "Configs"];

export const THEMES_LIST = [
    {
        title: "Blue UI",
        description: "@ayaanthe0ne",
        imageAssetUrl: blueThemeThumbnail,
    },
    {
        title: "Red UI",
        description: "@Deleted User#0000",
        imageAssetUrl: redThemeThumbnail,
    },
    {
        title: "Montezu's Theme",
        description: "@montezu_22",
        imageAssetUrl: cherryThemeThumbnail,
    }
];

export const SIDE_PROJECTS_LIST = [
    {
        title: "Murder Detector+ v3.2",
        description: "@axmbro",
        imageAssetUrl: murderDetectorThumbnail,
    },
    {
        title: "Custom Sky Overlay",
        description: "@axmbro",
        imageAssetUrl: skyOverlayThumbnail,
    },
];

export interface DownloadItemProps {
    title: string;
    description: string;
    downloadId: string;
    buttonType: "alwaysWhite" | "alwaysBlack" | "alwaysGreen";
    itemWeight: number;
    imageAssetUrl?: string;
}

export interface DownloadListProps {
    title: string;
    description: string;
    items: DownloadItemProps[];
}
