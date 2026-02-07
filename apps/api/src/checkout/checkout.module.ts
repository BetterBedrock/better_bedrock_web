import { Module } from "@nestjs/common";
import { CheckoutController } from "~/checkout/checkout.controller";
import { CheckoutService } from "./checkout.service";
import { VoucherService } from "~/voucher/voucher.service";
import { PrismaService } from "~/prisma.service";
import { AnalyticsService } from "~/analytics/analytics.service";
import { MailService } from "~/mail/mail.service";
import { ProjectService } from "~/project/project.service";
import { RatingService } from "~/rating/rating.service";
import { HttpModule } from "@nestjs/axios";

@Module({
    imports: [HttpModule],
    controllers: [CheckoutController],
    providers: [
        CheckoutService,
        MailService,
        VoucherService,
        AnalyticsService,
        PrismaService,
        ProjectService,
        RatingService,
    ],
})
export class CheckoutModule {}
