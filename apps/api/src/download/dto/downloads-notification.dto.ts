import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";

export const DownloadsNotificationType = {
    warning: "warning",
    success: "success",
    info: "info",
    error: "error",
} as const;

export type DownloadsNotificationType =
    (typeof DownloadsNotificationType)[keyof typeof DownloadsNotificationType];

export class DownloadsNotificationDto {
    /**
     * Title of the notification
     * @example 'Confirmation'
     */
    title: string;

    /**
     * Description of the notification
     * @example 'Confirmation'
     */
    description: string;

    @ApiProperty({
        enum: DownloadsNotificationType,
        enumName: "DownloadsNotificationType",
        example: DownloadsNotificationType.error,
    })
    @IsEnum(DownloadsNotificationType)
    type: "warning" | "info" | "success" | "error";
}
