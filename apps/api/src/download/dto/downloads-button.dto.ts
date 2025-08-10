import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { DownloadsNotificationDto } from "~/download/dto/downloads-notification.dto";

export const DownloadsButtonType = {
    white: "white",
    dark: "dark",
    green: "green",
} as const;

export type DownloadsButtonType = (typeof DownloadsButtonType)[keyof typeof DownloadsButtonType];

export class DownloadsButtonDto {
    @ApiProperty({
        enum: DownloadsButtonType,
        enumName: "DownloadsButtonType",
        example: DownloadsButtonType.dark,
    })
    @IsEnum(DownloadsButtonType)
    type: DownloadsButtonType;

    /**
     * Button inside the category yet not responsible for downloads
     * @example 'Share your texture packs'
     */
    text: string;
    /**
     * Link of redirection on button click (can be left if notification is prefered)
     * @example 'https://google.com'
     */
    link?: string;
    notification?: DownloadsNotificationDto;
}
