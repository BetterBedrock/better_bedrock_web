import { OmitType } from "@nestjs/swagger";
import { VoucherDto } from "src/voucher/dto/voucher.dto";

export class CreateVoucher extends OmitType(VoucherDto, [
    "id",
    "createdAt",
    "checkoutId",
] as const) {}
