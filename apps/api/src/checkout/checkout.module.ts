import { Module } from "@nestjs/common";
import { CheckoutController } from "~/checkout/checkout.controller";
import { CheckoutService } from "./checkout.service";
import { VoucherService } from "~/voucher/voucher.service";
import { PrismaService } from "~/prisma.service";
import { AnalyticsService } from "~/analytics/analytics.service";
import { MailService } from "~/mail/mail.service";

@Module({
    controllers: [CheckoutController],
    providers: [CheckoutService, MailService, VoucherService, AnalyticsService, PrismaService],
})
export class CheckoutModule {}
