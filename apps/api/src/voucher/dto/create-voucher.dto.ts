import { OmitType } from "@nestjs/swagger";
import { VoucherDto } from "~/voucher/dto/voucher.dto";

export class CreateVoucher extends OmitType(VoucherDto, ["id", "createdAt"] as const) {}
