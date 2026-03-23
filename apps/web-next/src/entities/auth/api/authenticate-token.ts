"use server";

import { authenticateRequest } from "@/entities/auth/api/auth-service";
import { cookies } from "next/headers";

export const authenticateToken = async (secret?: string) => {
    const cookie = await cookies();
    const existingSecret = cookie.get("secret")?.value;

    if (secret) {
        cookie.set("secret", secret, {
            path: "/",
            secure: true,
            sameSite: "strict",
        });
    }

    if (!existingSecret && !secret) return {};

    const { data, error } = await authenticateRequest(existingSecret ?? secret ?? "");
    return { data, error };
};
