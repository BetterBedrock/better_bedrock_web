import {
    Headers,
    Controller,
    HttpException,
    Logger,
    Post,
    RawBodyRequest,
    Req,
    Get,
    Query,
    BadGatewayException,
    NotFoundException,
    BadRequestException,
    ForbiddenException,
} from "@nestjs/common";
import { CheckoutService } from "src/checkout/checkout.service";
import { ActivateVoucherDto } from "src/checkout/dto/activate-voucher.dto";
import { VoucherService } from "src/voucher/voucher.service";
import Stripe from "stripe";
import {
    ApiBadGatewayResponse,
    ApiBadRequestResponse,
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
} from "@nestjs/swagger";
import { CreateCheckoutSessionDto } from "src/checkout/dto/create-checkout-session.dto";
import { CHECKOUT_OFFERS } from "src/checkout/constants/checkout-offers";
import { CreateCheckoutSessionResponseDto } from "src/checkout/dto/create-checkout-session-response.dto";
import { obscureEmail } from "src/utils/string";
import { CheckoutOffersDto } from "src/checkout/dto/checkout-offers.dto";
import { VoucherDto } from "src/voucher/dto/voucher.dto";
import { AnalyticsService } from "src/analytics/analytics.service";
import { AnalyticsNames } from "src/analytics/constants/analytics-names";

@ApiTags("checkout")
@Controller("checkout")
export class CheckoutController {
    constructor(
        private readonly checkoutService: CheckoutService,
        private readonly voucherService: VoucherService,
        private readonly analyticsService: AnalyticsService,
    ) {}

    @Get("offers")
    @ApiOkResponse({
        description: "Returns current checkout offers",
        type: CheckoutOffersDto,
    })
    async offers() {
        return CHECKOUT_OFFERS;
    }

    @Post("create")
    @ApiOkResponse({
        description: "Create a checkout session",
        type: CreateCheckoutSessionResponseDto,
    })
    @ApiBadGatewayResponse({ description: "Checkout could not be initiated" })
    @ApiNotFoundResponse({ description: "This offer does not exist" })
    async create(
        @Query() query: CreateCheckoutSessionDto,
    ): Promise<CreateCheckoutSessionResponseDto> {
        const ids = CHECKOUT_OFFERS.offers.flatMap((offer) => offer.items);
        if (!ids.find((item) => item.priceId === query.priceId)) {
            throw new NotFoundException("This offer does not exist");
        }
        try {
            const checkoutId = await this.checkoutService.createCheckoutSession(query);
            return { checkoutId };
        } catch (err) {
            throw new BadGatewayException("Checkout could not be initiated: " + err);
        }
    }

    @Get("activate")
    @ApiOkResponse({
        description: "Returns voucher for given code",
        type: VoucherDto,
    })
    @ApiNotFoundResponse({ description: "Voucher not found" })
    @ApiBadRequestResponse({ description: "You need to provide either checkoutId or voucher code" })
    @ApiBadGatewayResponse({ description: "Activation was unsuccessful" })
    @ApiForbiddenResponse({ description: "Voucher is blocked" })
    async activate(@Query() query: ActivateVoucherDto) {
        if (!query.checkoutId && !query.code) {
            throw new BadRequestException("You need to provide either checkoutId or voucher code");
        }

        try {
            const voucher = await this.voucherService.getVoucher({
                checkoutId: query.checkoutId == "" ? undefined : query.checkoutId,
                code: query.code,
            });
            if (!voucher) {
                throw new NotFoundException("Voucher not found");
            }

            if (voucher.blocked) {
                throw new ForbiddenException("Voucher is blocked");
            }

            voucher.email = obscureEmail(voucher.email);

            return voucher;
        } catch (err) {
            if (err instanceof HttpException) throw err;
            throw new BadGatewayException("Activation was unsuccessful" + err);
        }
    }

    @Post("webhook")
    @ApiOkResponse({ description: "Handle checkout webhook" })
    async webhook(
        @Headers("stripe-signature") signature: string,
        @Req() req: RawBodyRequest<Request>,
    ) {
        let event;
        try {
            event = this.checkoutService.constructWebhookEvent(req.rawBody!, signature);
        } catch (err) {
            Logger.error("⚠️  Webhook signature verification failed.", err.message);
            throw new HttpException("Webhook Error: Signature verification failed", 400);
        }

        if (event.type === "checkout.session.completed") {
            const session = event.data.object as Stripe.Checkout.Session;
            const fullSession = await this.checkoutService.retriveSession(session.id);

            const email = fullSession.customer_details?.email;
            const items = fullSession.line_items!.data;
            items.forEach(async (item) => {
                const productName = (item!.price!.product as Stripe.Product).name;
                const priceId = item!.price!.id;
                const ids = CHECKOUT_OFFERS.offers.flatMap((offer) => offer.items);
                const product = ids.find((item) => item.priceId === priceId);

                if (!product) {
                    Logger.error(
                        `User with email ${email} tried to purchase ${priceId} but the product does not exist`,
                    );
                    return;
                }

                const priceOptions = product.priceOption;

                const price = item.amount_total / 100;
                // reward user
                Logger.log(`User with email ${email} purchased ${productName} for $${price}.`);
                await this.voucherService.createVoucher({
                    email: email ?? "unknown",
                    checkoutId: session.id,
                    code: this.voucherService.generateCode(8),
                    maxDownloads: priceOptions.maxDownloads,
                    betterBedrockContentOnly: priceOptions.betterBedrockContentOnly,
                    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * priceOptions.expiresAt), // 30 days from now
                });

                await this.analyticsService.incrementAnalytics(
                    AnalyticsNames.boughtVouchers,
                    "general",
                );
            });
        }
    }
}
