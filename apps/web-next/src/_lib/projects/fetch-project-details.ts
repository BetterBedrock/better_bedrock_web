"use server";

import { fetchProjectDetailsRequest } from "@/_services"

export const fetchProjectDetails = async (id: string) => {
    const { data } = await fetchProjectDetailsRequest(id);

    return data;
}