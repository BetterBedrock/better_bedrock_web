"use server";

import { fetchProjectDetailsRequest } from "@/services/project-service"

export const fetchProjectDetails = async (id: string) => {
    const { data, error } = await fetchProjectDetailsRequest(id);

    return { data, error };
}