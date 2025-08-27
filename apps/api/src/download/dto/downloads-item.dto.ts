import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { DownloadsButtonType } from "~/download/dto/downloads-button.dto";

export class DownloadsItemDto {
    /**
     * Id of the project
     * @example 'better_bedrock.mcpack'
     */
    projectId: string;

    @ApiProperty({
        enum: DownloadsButtonType,
        enumName: "DownloadsButtonType",
        example: DownloadsButtonType.dark,
    })
    @IsEnum(DownloadsButtonType)
    buttonType: DownloadsButtonType;

    /**
     * Description of the item
     * @example 'Dark mode in minecraft'
     */
    description: string;

    /**
     * Color of the text inside the download card
     * @example 'black'
     */
    titleColor?: string;
    tagBgColor?: string;
}
