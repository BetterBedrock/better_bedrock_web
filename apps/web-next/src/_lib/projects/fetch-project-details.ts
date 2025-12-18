"use server";

import { fetchProjectDetailsRequest } from "@/_services/project-service"

export const fetchProjectDetails = async (id: string) => {
    const { data } = await fetchProjectDetailsRequest(id);

    return data;
}