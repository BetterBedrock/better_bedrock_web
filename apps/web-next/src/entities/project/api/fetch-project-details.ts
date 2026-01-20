"use server";

import { fetchProjectDetailsRequest } from "@/entities/project/api/project-service";

export const fetchProjectDetails = async (id: string) => {
    const { data, error } = await fetchProjectDetailsRequest(id);

    return { data, error };
};
