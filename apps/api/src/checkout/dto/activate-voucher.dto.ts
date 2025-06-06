import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class ActivateVoucherDto {
    /**
     * Id of the Stripe's checkout session
     * @example 'cs_test_a11YYufWQzNY63zpQ6QSNRQhkUpVph4WRmzW0zWJO2znZKdVujZ0N0S22u'
     */
    @ApiPropertyOptional({
        example: "cs_test_a11YYufWQzNY63zpQ6QSNRQhkUpVph4WRmzW0zWJO2znZKdVujZ0N0S22u",
        description: "Id of the Stripe's checkout session",
    })
    @IsString()
    @IsOptional()
    checkoutId: string;

    /**
     * Code of a voucher to activate
     * @example '12345678'
     */
    @ApiPropertyOptional({ example: "12345678", description: "Code of a voucher to activate" })
    @IsString()
    @IsOptional()
    code: string;
}
