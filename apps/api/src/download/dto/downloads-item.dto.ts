import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { DownloadsButtonType } from "src/download/dto/downloads-button.dto";

export class DownloadsItemDto {
    title: string;
    creator: string;
    description: string;
    downloadId: string;

    @ApiProperty({
        enum: DownloadsButtonType,
        enumName: "DownloadsButtonType",
        example: DownloadsButtonType.alwaysBlack,
    })
    @IsEnum(DownloadsButtonType)
    buttonType: DownloadsButtonType;

    itemWeight: number;
    imageAssetUrl: string[];

    tags?: string[];
    titleColor?: string;
}
