"use server";

import { createSessionRequest } from "@/_services";

export const createSession = async (priceId: string) => {
    const { data } = await createSessionRequest(priceId);
    return data;
}