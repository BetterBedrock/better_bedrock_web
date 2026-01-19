import { createSession } from "@/entities/checkout";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "",
);

export const createStripeSession = async (priceId: string) => {
    try {
        console.log("Creating Stripe session for priceId:", priceId);
        const session = await createSession(priceId);
        if (!session || !session.checkoutId) {
            console.error("Failed to create a checkout session.");
            return;
        }

        const stripe = await stripePromise;
        if (!stripe) {
            console.error("Stripe.js has not loaded yet.");
            return;
        }

        const { error } = await stripe.redirectToCheckout({
            sessionId: session.checkoutId,
        });

        if (error) {
            console.error("Stripe redirectToCheckout error:", error.message);
        }
    } catch (error) {
        console.error("An error occurred during the purchase process:", error);
    }
};
