import { IsOptional, IsString } from "class-validator";

export class ActivateVoucherDto {
    /**
     * Id of the Stripe's checkout session
     * @example 'cs_test_a11YYufWQzNY63zpQ6QSNRQhkUpVph4WRmzW0zWJO2znZKdVujZ0N0S22u'
     */
    @IsString()
    @IsOptional()
    checkoutId?: string;

    /**
     * Code of a voucher to activate
     * @example '12345678'
     */
    @IsString()
    @IsOptional()
    code?: string;
}
