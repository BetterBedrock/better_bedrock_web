import { Module } from "@nestjs/common";
import { PrismaService } from "~/prisma.service";
import { VoucherController } from "~/voucher/voucher.controller";
import { VoucherService } from "~/voucher/voucher.service";

@Module({
    controllers: [VoucherController],
    providers: [VoucherService, PrismaService],
})
export class VoucherModule {}
