import { Type } from "class-transformer";
import { IsString, IsArray, ValidateNested } from "class-validator";
import { CheckoutOptionEntryDto } from "~/checkout/dto/checkout-option-entry.dto";

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
