import { fetchCheckoutOffersRequest } from "@/entities/checkout/api/checkout-service";

export const fetchCheckoutOffers = async () => {
    const { data } = await fetchCheckoutOffersRequest();
    return data;
};
