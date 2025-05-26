export const TAB_NAMES: string[] = ["Main", "Community", "Side Projects"];

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
