import { IsString } from "class-validator";

export class CreateCheckoutSessionDto {
    /**
     * Id of the Stripe's price
     * @example 'price_123456'
     */
    @IsString()
    priceId: string;
}
