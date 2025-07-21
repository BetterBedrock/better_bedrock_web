import { CheckoutOffersDto } from "src/checkout/dto/checkout-offers.dto";

export const CHECKOUT_OFFERS: CheckoutOffersDto = {
    offers: [
        {
            title: "Week",
            items: [
                {
                    priceId: "price_1RYVyQQKPqpU2QRop44SCri8",
                    priceOption: {
                        price: 1,
                        label: "One Week • Better Bedrock Content Only",
                        title: "Get 50 Ad Free Downloads",
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
                        label: "One Week • Everything On The Site",
                        title: "Get 50 Ad Free Downloads",
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
                        label: "Forever Discord VIP Rank • One Week • Better Bedrock Content Only",
                        title: "Get 50 Ad Free Downloads",
                        featured: true,
                        maxDownloads: 50,
                        expiresAt: 7,
                        betterBedrockContentOnly: false,
                    },
                },
            ],
        },
        {
            title: "Month",
            items: [
                {
                    priceId: "price_1RZZ9cQKPqpU2QRoVuq7xh7J",
                    priceOption: {
                        price: 3,
                        label: "One Month • Better Bedrock Content Only",
                        title: "Get 300 Ad Free Downloads",
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
                        label: "One Month • Everything On The Site",
                        title: "Get 300 Ad Free Downloads",
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
                        label: "Forever Discord VIP Rank • One Month • Everything On The Site ",
                        title: "Get 300 Ad Free Downloads",
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
