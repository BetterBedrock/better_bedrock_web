"use server";

import { createSessionRequest } from "@/entities/checkout/api/checkout-service";

export const createSession = async (priceId: string) => {
    const { data } = await createSessionRequest(priceId);
    return data;
};
