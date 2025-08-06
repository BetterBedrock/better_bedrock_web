export class DownloadsRichDescriptionDto {
    /**
     * Text display above the image
     * @example 'Before & After'
     */
    name: string;

    /**
     * List of links to images
     * @example ["/static/assets/image.png"]
     */
    images: string[];
}
