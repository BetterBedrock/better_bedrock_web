import { loadStripe } from "@stripe/stripe-js";
import { useCheckout } from "~/providers/checkout";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const useCreateStripeSession = () => {
    const { createSession } = useCheckout();

    return async (priceId: string) => {
        try {
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
};