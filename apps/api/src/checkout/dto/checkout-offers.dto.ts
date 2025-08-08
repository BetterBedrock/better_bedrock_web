import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";
import { CheckoutOptionGroupDto } from "~/checkout/dto/checkout-option-group.dto";

export class CheckoutOffersDto {
    /**
     * Array of checkout option groups
     */
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CheckoutOptionGroupDto)
    offers: CheckoutOptionGroupDto[];
}
