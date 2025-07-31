import { CheckoutOffersDto } from "src/checkout/dto/checkout-offers.dto";

export const CHECKOUT_OFFERS: CheckoutOffersDto = {
    offers: [
        {
            title: "Weekly",
            items: [
                {
                    priceId: "price_1RYVyQQKPqpU2QRop44SCri8",
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
                    priceId: "price_1RZZ7iQKPqpU2QRofx62IzDd",
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
                    priceId: "price_1RZZ8vQKPqpU2QRo9P4CgfTg",
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
                    priceId: "price_1RZZ9cQKPqpU2QRoVuq7xh7J",
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
                    priceId: "price_1RZZBDQKPqpU2QRoa4GnIPKc",
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
                    priceId: "price_1RZZDAQKPqpU2QRoyHXD6wrr",
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
