"use server";

import { fetchSettingsRequest } from "./settings-service"

export const fetchSettings = async () => {
    const { data, error } = await fetchSettingsRequest();

    return { data, error };
}