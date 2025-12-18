"use server";

import { fetchCheckoutOffersRequest } from "@/_services/checkout-service";

export const fetchCheckoutOffers = async () => {
    const { data } = await fetchCheckoutOffersRequest();
    return data;
}