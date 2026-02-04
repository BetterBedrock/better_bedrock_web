import { ButtonType } from "@/shared/ui/button";

export enum DownloadsItemType {
    green = "green",
    yellow = "yellow",
    orange = "orange",
    white = "white",
}

export type DownloadsItemTypeKey = keyof typeof DownloadsItemType;

export interface DownloadsItemDto {
    projectId: string;
    buttonType: ButtonType;
    description: string;
    type: DownloadsItemTypeKey;
}
