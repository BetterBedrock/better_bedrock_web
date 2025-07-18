import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { VoucherController } from "src/voucher/voucher.controller";
import { VoucherService } from "src/voucher/voucher.service";

@Module({
    controllers: [VoucherController],
    providers: [VoucherService, PrismaService],
})
export class VoucherModule {}
