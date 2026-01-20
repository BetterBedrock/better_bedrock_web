"use server";

import { fetchCommentsRequest } from "@/entities/project/api/project-service";

export const fetchComments = async (id: string) => {
    const { data } = await fetchCommentsRequest(id);
    return data;
};
