"use server";

import { googleAuthorizeRequest } from "@/entities/auth/api/auth-service";

export const googleAuthorize = async (token?: string) => {
    const { data, error } = await googleAuthorizeRequest(token ?? "");
    return { data, error };
};
