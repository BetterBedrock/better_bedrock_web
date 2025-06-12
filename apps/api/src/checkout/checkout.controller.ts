import {
    Headers,
    Controller,
    HttpException,
    Logger,
    Post,
    RawBodyRequest,
    Req,
} from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";
import { CheckoutService } from "src/checkout/checkout.service";
import Stripe from "stripe";

@Controller("checkout")
export class CheckoutController {
    constructor(private readonly checkoutService: CheckoutService) {}

    @Post("create")
    @ApiOkResponse({ description: "Create a checkout session" })
    async create() {
        try {
            const id = await this.checkoutService.createCheckoutSession();
            return { sessionId: id };
        } catch (error) {
            console.error("Error creating checkout session:", error);
        }

        return {};
    }

    @Post("webhook")
    @ApiOkResponse({ description: "Handle checkout webhook" })
    async webhook(
        @Headers("stripe-signature") signature: string,
        @Req() req: RawBodyRequest<Request>,
    ) {
        Logger.error("Received webhook event:");
        let event;
        try {
            event = this.checkoutService.constructWebhookEvent(req.rawBody!, signature);
        } catch (err) {
            Logger.error("⚠️  Webhook signature verification failed.", err.message);
            throw new HttpException("Webhook Error: Signature verification failed", 400);
        }

        if (event.type === "checkout.session.completed") {
            Logger.debug(event.data.object);
            const session = event.data.object as Stripe.Checkout.Session;
            const fullSession = await this.checkoutService.retriveSession(session.id);

            const email = fullSession.customer_details?.email;
            const items = fullSession.line_items!.data;

            items.forEach((item) => {
                const productName = (item!.price!.product as Stripe.Product).name;
                const price = item.amount_total / 100;
                // reward user
                Logger.log(`User with email ${email} purchased ${productName} for $${price}.`);
            });
        }

        return { received: true };
    }
}
