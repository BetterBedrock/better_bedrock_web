import { Module } from "@nestjs/common";
import { CheckoutController } from "src/checkout/checkout.controller";
import { CheckoutService } from "./checkout.service";
import { VoucherService } from "src/voucher/voucher.service";
import { PrismaService } from "src/prisma.service";

@Module({
    controllers: [CheckoutController],
    providers: [CheckoutService, VoucherService, PrismaService],
})
export class CheckoutModule {}
