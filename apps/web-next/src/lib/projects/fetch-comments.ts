"use server";

import { fetchCommentsRequest } from "@/services/project-service";

export const fetchComments = async (id: string) => {
    const { data } = await fetchCommentsRequest(id);
    return data;
}