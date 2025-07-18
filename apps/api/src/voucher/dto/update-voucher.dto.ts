import { OmitType, PartialType } from "@nestjs/swagger";
import { VoucherDto } from "src/voucher/dto/voucher.dto";

export class UpdateVoucher extends PartialType(
    OmitType(VoucherDto, ["id", "createdAt"] as const),
) {}
