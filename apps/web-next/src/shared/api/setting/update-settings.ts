"use server";

import { updateSettingsRequest } from "./settings-service"
import { SettingsDto } from "@/shared/lib/openapi";
import { cookies } from "next/headers";

export const updateSettings = async (newSettings: SettingsDto) => {
    const cookieStore = await cookies();
    const secret = cookieStore.get("secret")?.value;

    if (!secret) {
        return { error: "You are not logged in." }
    }

    const { data, error } = await updateSettingsRequest(newSettings, secret);

    return { data, error };
}