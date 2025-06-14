import { IsBoolean, IsDate, IsEmail, IsInt, IsString, Min } from "class-validator";
import { Type } from "class-transformer";
import "reflect-metadata";

export class VoucherDto {
    /**
     * Unique identifier of the voucher
     * @example "ckv9p34s50000svef8bl7w2gb"
     */
    @IsString()
    id: string;

    /**
     * Email associated with the voucher
     * @example "user@example.com"
     */
    @IsEmail()
    email: string;

    /**
     * Unique checkout session ID associated with the voucher
     * @example "chk_1234567890abcdef"
     */
    @IsString()
    checkoutId: string;

    /**
     * Unique voucher code
     * @example "SUMMER2025"
     */
    @IsString()
    code: string;

    /**
     * Date and time when the voucher was created
     * @example "2025-06-01T12:34:56.789Z"
     */
    @IsDate()
    @Type(() => Date)
    createdAt: Date;

    /**
     * Expiry date of the voucher
     * @example "2025-12-31T23:59:59.000Z"
     */
    @IsDate()
    @Type(() => Date)
    expiresAt: Date;

    /**
     * Maximum number of times the voucher can be downloaded
     * @example 1
     */
    @IsInt()
    @Min(1)
    maxDownloads: number;

    /**
     * Current number of times the voucher has been downloaded
     * @example 0
     */
    @IsInt()
    @Min(0)
    downloadCount: number;

    /**
     * Restrict voucher to Better Bedrock content only
     * @example false
     */
    @IsBoolean()
    betterBedrockContentOnly: boolean;
}
