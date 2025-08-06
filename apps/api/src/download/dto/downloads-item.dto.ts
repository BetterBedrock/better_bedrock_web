import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { DownloadsButtonType } from "src/download/dto/downloads-button.dto";
import { DownloadsRichDescriptionDto } from "src/download/dto/downloads-rich-description.dto";

export class DownloadsItemDto {
    /**
     * Title of the item
     * @example ''
     */
    title: string;

    /**
     * Creator of the download item
     * @example 'axmbro'
     */
    creator: string;

    /**
     * Description of the item
     * @example 'Dark mode in minecraft'
     */
    description: string;

    /**
     * Id of the item & file name used when downloading and fetching file from the server
     * @example 'better_bedrock_v8.mcpack'
     */
    downloadId: string;

    @ApiProperty({
        enum: DownloadsButtonType,
        enumName: "DownloadsButtonType",
        example: DownloadsButtonType.dark,
    })
    @IsEnum(DownloadsButtonType)
    buttonType: DownloadsButtonType;

    /**
     * Weigh of the download item
     * @example 1
     */
    itemWeight: number;

    /**
     * Image urls used for download items with preview option
     * @example ["static/assets/better_bedrock_v8.png"]
     */
    imageAssetUrl: string[];

    richDescription?: DownloadsRichDescriptionDto[];

    /**
     * Tags displayed inside the download grid card
     * @example ["MCBE 1.12", "BB V8"]
     */
    tags?: string[];

    /**
     * Color of the text inside the download card
     * @example 'black'
     */
    titleColor?: string;

    /**
     * Determines whether the item is considered better bedrock content
     * @example false
     */
    betterBedrockContent?: boolean;
}
