import { Injectable } from "@nestjs/common";
import Stripe from "stripe";

@Injectable()
export class CheckoutService {
    private stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");

    async createCheckoutSession() {
        const baseUrl =
            process.env.DEBUG === "true"
                ? process.env.FRONTEND_URL
                : process.env.LOCAL_FRONTEND_URL;

        const session = await this.stripe.checkout.sessions.create({
            line_items: [
                {
                    price: "price_1RYVyQQKPqpU2QRop44SCri8",
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${baseUrl}/checkout/cancel`,
        });
        return session.id;
    }

    constructWebhookEvent(rawBody: Buffer, signature: string) {
        const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET ?? "";
        return this.stripe.webhooks.constructEvent(rawBody, signature, endpointSecret);
    }

    async retriveSession(sessionId: string) {
        return this.stripe.checkout.sessions.retrieve(sessionId, {
            expand: ["line_items.data.price.product", "customer"],
        });
    }
}
