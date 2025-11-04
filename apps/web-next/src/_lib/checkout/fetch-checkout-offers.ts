"use server";

import { fetchCheckoutOffersRequest } from "@/_services";

export const fetchCheckoutOffers = async () => {
    const { data } = await fetchCheckoutOffersRequest();
    return data;
}