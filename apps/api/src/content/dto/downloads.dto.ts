import { IsString } from "class-validator";

export class DownloadsItemDto {
    title: string;
    description: string;
    downloadId: string;
    buttonType: "alwaysWhite" | "alwaysBlack" | "alwaysGreen";
    itemWeight: number;
    imageAssetUrl: string;
}

export class DownloadsListDto {
    @IsString()
    title: string;
    description: string;
    items: DownloadsItemDto[];
}
