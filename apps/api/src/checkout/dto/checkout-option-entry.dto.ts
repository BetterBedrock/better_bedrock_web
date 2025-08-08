import { Type } from "class-transformer";
import { IsString, ValidateNested } from "class-validator";
import { PriceOptionDto } from "~/checkout/dto/price-option.dto";

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
