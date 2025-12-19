"use server";

import { createSessionRequest } from "@/services/checkout-service";

export const createSession = async (priceId: string) => {
    const { data } = await createSessionRequest(priceId);
    return data;
}