import { IsString } from "class-validator";

export class CreateCheckoutSessionResponseDto {
    /**
     * Id of the Stripe's checkout session
     * @example 'cs_test_a11YYufWQzNY63zpQ6QSNRQhkUpVph4WRmzW0zWJO2znZKdVujZ0N0S22u'
     */
    @IsString()
    checkoutId: string;
}
