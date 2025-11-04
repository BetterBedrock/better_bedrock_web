"use server";

import { fetchProjectDetailsRequest } from "@/_services"

export const fetchProjectDetails = async (id: string) => {
    try {
        const { data } = await fetchProjectDetailsRequest(id);

        return data;
    } catch (_) {
        return;
    }
}