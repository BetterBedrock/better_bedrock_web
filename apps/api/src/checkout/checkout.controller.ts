import {
    Headers,
    Controller,
    Post,
    RawBodyRequest,
    Req,
    Get,
    Query,
    NotFoundException,
    BadRequestException,
} from "@nestjs/common";
import { CheckoutService } from "~/checkout/checkout.service";
import { ActivateVoucherDto } from "~/checkout/dto/activate-voucher.dto";
import { VoucherService } from "~/voucher/voucher.service";
import Stripe from "stripe";
import { CreateCheckoutSessionDto } from "~/checkout/dto/create-checkout-session.dto";
import { CHECKOUT_OFFERS } from "~/checkout/constants/checkout-offers";
import { CreateCheckoutSessionResponseDto } from "~/checkout/dto/create-checkout-session-response.dto";
import { CheckoutOffersDto } from "~/checkout/dto/checkout-offers.dto";
import { VoucherDto } from "~/voucher/dto/voucher.dto";
import { AnalyticsService } from "~/analytics/analytics.service";
import { AnalyticsNames } from "~/analytics/constants/analytics-names";
import { Throttle } from "@nestjs/throttler";
import { MailService } from "~/mail/mail.service";

@Controller("checkout")
export class CheckoutController {
    constructor(
        private checkoutService: CheckoutService,
        private voucherService: VoucherService,
        private analyticsService: AnalyticsService,
        private mailService: MailService,
    ) {}

    @Get("offers")
    async offers(): Promise<CheckoutOffersDto> {
        await this.analyticsService.incrementAnalytics(AnalyticsNames.visits, "general");

        return CHECKOUT_OFFERS;
    }

    @Post("create")
    async create(
        @Query() query: CreateCheckoutSessionDto,
    ): Promise<CreateCheckoutSessionResponseDto> {
        const ids = CHECKOUT_OFFERS.offers.flatMap((offer) => offer.items);
        if (!ids.find((item) => item.priceId === query.priceId)) {
            throw new NotFoundException("This offer does not exist");
        }

        const checkoutId = await this.checkoutService.createCheckoutSession(query);
        return { checkoutId };
    }

    @Get("activate")
    @Throttle({
        default: {
            ttl: 60000,
            limit: 50,
        },
    })
    activate(@Query() query: ActivateVoucherDto): Promise<VoucherDto> {
        if (!query.checkoutId && !query.code) {
            throw new BadRequestException("You need to provide either checkoutId or voucher code");
        }

        return this.voucherService.activate(query);
    }

    @Post("webhook")
    async webhook(
        @Headers("stripe-signature") signature: string,
        @Req() req: RawBodyRequest<Request>,
    ) {
        let event: Stripe.Event;

        try {
            event = this.checkoutService.constructWebhookEvent(req.rawBody!, signature);
        } catch {
            throw new BadRequestException("Signature verification failed");
        }

        if (event.type !== "checkout.session.completed") {
            return;
        }

        const session = event.data.object as Stripe.Checkout.Session;
        const fullSession = await this.checkoutService.retriveSession(session.id);

        const email = fullSession.customer_details?.email ?? "unknown";

        const existing = await this.voucherService.findByCheckoutId(session.id);
        if (existing) return;

        const items = fullSession.line_items?.data ?? [];

        for (const item of items) {
            const priceId = item?.price?.id;
            if (!priceId) continue;

            const product = CHECKOUT_OFFERS.offers
                .flatMap((offer) => offer.items)
                .find((i) => i.priceId === priceId);

            if (!product) continue;

            const { maxDownloads, betterBedrockContentOnly, expiresAt } = product.priceOption;
            const code = this.voucherService.generateCode(8);

            await this.voucherService.createVoucher({
                email,
                checkoutId: session.id,
                code,
                maxDownloads,
                betterBedrockContentOnly,
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * expiresAt),
            });

            if (email !== "unknown") {
                await this.mailService.sendVoucherEmail(email, code);
            }

            await this.analyticsService.incrementAnalytics(
                AnalyticsNames.boughtVouchers,
                "general",
            );
        }
    }
}
