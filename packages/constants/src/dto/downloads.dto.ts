export class DownloadsItemDto {
    title: string;
    creator: string;
    description: string;
    downloadId: string;
    buttonType: "alwaysWhite" | "alwaysBlack" | "alwaysGreen";
    itemWeight: number;
    imageAssetUrl: string[];
}

export class DownloadNotificationDto {
    title: string;
    description: string;
    type: "warning" | "info" | "success" | "error";
}

export class DownloadButtonDto {
    type: "alwaysWhite" | "alwaysBlack" | "alwaysGreen";
    text: string;
    link?: string;
    notification?: DownloadNotificationDto;
}

export class DownloadsListDto {
    title: string;
    description: string;
    buttons?: DownloadButtonDto[];
    items: DownloadsItemDto[];
}

export class DownloadsDto {
    main: DownloadsListDto[];
    community: DownloadsListDto[];
    sideProjects: DownloadsListDto[];
}
