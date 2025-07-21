import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { DownloadsNotificationDto } from "src/download/dto/downloads-notification.dto";

export const DownloadsButtonType = {
    alwaysWhite: "alwaysWhite",
    alwaysBlack: "alwaysBlack",
    alwaysGreen: "alwaysGreen",
} as const;

export type DownloadsButtonType = (typeof DownloadsButtonType)[keyof typeof DownloadsButtonType];

export class DownloadsButtonDto {
    @ApiProperty({
        enum: DownloadsButtonType,
        enumName: "DownloadsButtonType",
        example: DownloadsButtonType.alwaysBlack,
    })
    @IsEnum(DownloadsButtonType)
    type: DownloadsButtonType;

    text: string;
    link?: string;
    notification?: DownloadsNotificationDto;
}
