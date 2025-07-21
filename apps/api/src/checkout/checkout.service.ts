import { Injectable } from "@nestjs/common";
import { CreateCheckoutSessionDto } from "src/checkout/dto/create-checkout-session.dto";
import Stripe from "stripe";

@Injectable()
export class CheckoutService {
    private stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");

    async createCheckoutSession(query: CreateCheckoutSessionDto) {
        const baseUrl =
            process.env.DEBUG === "true"
                ? process.env.LOCAL_FRONTEND_URL
                : process.env.FRONTEND_URL;

        const session = await this.stripe.checkout.sessions.create({
            line_items: [
                {
                    price: query.priceId,
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${baseUrl}/checkout/success?checkoutId={CHECKOUT_SESSION_ID}`,
            cancel_url: `${baseUrl}/checkout/cancel`,
        });
        return session.id;
    }

    constructWebhookEvent(rawBody: Buffer, signature: string) {
        const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET ?? "";
        return this.stripe.webhooks.constructEvent(rawBody, signature, endpointSecret);
    }

    async retriveSession(checkoutId: string) {
        return await this.stripe.checkout.sessions.retrieve(checkoutId, {
            expand: ["line_items.data.price.product", "customer"],
        });
    }
}
