import { CheckoutOffersDto } from "src/checkout/dto/checkout-offers.dto";

export const CHECKOUT_OFFERS: CheckoutOffersDto = {
    offers: [
        {
            title: "Weekly",
            items: [
                {
                    priceId: "price_1RtWUQKgf6LpBRfQlUYvzBfI",
                    priceOption: {
                        price: 1,
                        label: "",
                        title: "Only Better Bedrock Content",
                        featured: false,
                        maxDownloads: 50,
                        expiresAt: 7,
                        betterBedrockContentOnly: true,
                    },
                },
                {
                    priceId: "price_1RtWWGKgf6LpBRfQgEy8ugJL",
                    priceOption: {
                        price: 2,
                        label: "",
                        title: "Everything On The Site",
                        featured: false,
                        maxDownloads: 50,
                        expiresAt: 7,
                        betterBedrockContentOnly: false,
                    },
                },
                {
                    priceId: "price_1RtWWXKgf6LpBRfQ1TTdsWG1",
                    priceOption: {
                        price: 5,
                        label: "",
                        title: "Everything On The Site • Permanent Discord VIP role",
                        featured: true,
                        maxDownloads: 50,
                        expiresAt: 7,
                        betterBedrockContentOnly: false,
                    },
                },
            ],
        },
        {
            title: "Monthly",
            items: [
                {
                    priceId: "price_1RtWXwKgf6LpBRfQXh42GPor",
                    priceOption: {
                        price: 3,
                        label: "",
                        title: "Only Better Bedrock Content",
                        featured: false,
                        maxDownloads: 300,
                        expiresAt: 30,
                        betterBedrockContentOnly: true,
                    },
                },
                {
                    priceId: "price_1RtWYAKgf6LpBRfQnIwvhMXz",
                    priceOption: {
                        price: 5,
                        label: "",
                        title: "Everything On The Site",
                        featured: false,
                        maxDownloads: 300,
                        expiresAt: 30,
                        betterBedrockContentOnly: false,
                    },
                },
                {
                    priceId: "price_1RtWYIKgf6LpBRfQfEWPBOTu",
                    priceOption: {
                        price: 10,
                        label: "",
                        title: "Everything On The Site • Permanent Discord VIP role",
                        featured: true,
                        maxDownloads: 300,
                        expiresAt: 30,
                        betterBedrockContentOnly: false,
                    },
                },
            ],
        },
    ],
};
