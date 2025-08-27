import { ButtonType } from "~/components/bedrock/button";

export interface DownloadsItemDto {
    projectId: string;
    buttonType: ButtonType;
    description: string;
    titleColor?: string;
    tagBgColor?: string;
    imageAssetUrl?: string;
}

