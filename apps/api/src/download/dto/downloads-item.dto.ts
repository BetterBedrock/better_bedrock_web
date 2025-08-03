import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { DownloadsButtonType } from "src/download/dto/downloads-button.dto";
import { DownloadsRichDescriptionDto } from "src/download/dto/downloads-rich-description.dto";

export class DownloadsItemDto {
    title: string;
    creator: string;
    description: string;
    downloadId: string;

    @ApiProperty({
        enum: DownloadsButtonType,
        enumName: "DownloadsButtonType",
        example: DownloadsButtonType.dark,
    })
    @IsEnum(DownloadsButtonType)
    buttonType: DownloadsButtonType;

    itemWeight: number;
    imageAssetUrl: string[];

    richDescription?: DownloadsRichDescriptionDto[];

    tags?: string[];
    titleColor?: string;
    betterBedrockContent?: boolean;
}
