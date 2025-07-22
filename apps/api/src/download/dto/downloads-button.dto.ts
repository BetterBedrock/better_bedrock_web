import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { DownloadsNotificationDto } from "src/download/dto/downloads-notification.dto";

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

    text: string;
    link?: string;
    notification?: DownloadsNotificationDto;
}
