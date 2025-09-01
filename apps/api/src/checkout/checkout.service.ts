import { BadGatewayException, Injectable } from "@nestjs/common";
import { CreateCheckoutSessionDto } from "~/checkout/dto/create-checkout-session.dto";
import Stripe from "stripe";
import { baseFrontendUrl } from "~/utils/url";

@Injectable()
export class CheckoutService {
    private stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");

    async createCheckoutSession(query: CreateCheckoutSessionDto) {
        try {
            const session = await this.stripe.checkout.sessions.create({
                line_items: [
                    {
                        price: query.priceId,
                        quantity: 1,
                    },
                ],
                mode: "payment",
                success_url: `${baseFrontendUrl}/checkout/success?checkoutId={CHECKOUT_SESSION_ID}`,
                cancel_url: `${baseFrontendUrl}/checkout/cancel`,
            });
            return session.id;
        } catch (err) {
            throw new BadGatewayException("Checkout could not be initiated: " + err);
        }
    }

    constructWebhookEvent(rawBody: Buffer, signature: string) {
        const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET ?? "";
        return this.stripe.webhooks.constructEvent(rawBody, signature, endpointSecret);
    }

    async retriveSession(checkoutId: string) {
        return this.stripe.checkout.sessions.retrieve(checkoutId, {
            expand: ["line_items.data.price.product", "customer"],
        });
    }
}
