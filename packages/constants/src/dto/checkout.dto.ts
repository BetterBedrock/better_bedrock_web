import { Type } from 'class-transformer';
import {
    IsArray,
    IsBoolean,
    IsInt,
    isNumber,
    IsNumber,
    IsString,
    ValidateNested,
} from 'class-validator';

export class PriceOptionDto {
    /**
     * Price in EUR
     * @example 1
     */
    @IsInt()
    price: number;

    /**
     * Description of the pricing option
     * @example 'For One Week (Better Bedrock Content Only)'
     */
    @IsString()
    label: string;

    /**
     * A title for the DownloadMethodCard
     * @example 'Get 50 Ad Free Downloads'
     */
    @IsString()
    title: string;

    /**
     * Whether this option is featured
     * @example false
     */
    @IsBoolean()
    featured: boolean;

    /**
     * How many dowloads does user get with the voucher
     * @example 1
     */
    @IsInt()
    maxDownloads: number;

    /**
     * How many days from today does user have to use the voucher
     * @example 7
     */
    @IsInt()
    expiresAt: number;

    /**
     * Specifies whether the voucher allows for download of Better Bedrock content
     * @example true
     */
    @IsBoolean()
    betterBedrockContentOnly: boolean;
}

export class CheckoutOptionEntryDto {
    /**
     * Stripe price ID
     * @example 'price_1RYVyQQKPqpU2QRop44SCri8'
     */
    @IsString()
    priceId: string;

    /**
     * Pricing option details
     */
    @ValidateNested()
    @Type(() => PriceOptionDto)
    priceOption: PriceOptionDto;
}

export class CheckoutOptionGroupDto {
    /**
     * Title of the group (e.g. Week, Month)
     * @example 'Week'
     */
    @IsString()
    title: string;

    /**
     * List of pricing entries for this group
     */
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CheckoutOptionEntryDto)
    items: CheckoutOptionEntryDto[];
}

export class CheckoutOffersDto {
    /**
     * Array of checkout option groups
     */
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CheckoutOptionGroupDto)
    offers: CheckoutOptionGroupDto[];
}
