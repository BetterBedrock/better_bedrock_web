"use server";

import { fetchCommentsRequest } from "@/entities/project/api/project-service";

export const fetchComments = async (id: string, page: number) => {
    const { data } = await fetchCommentsRequest(id, page);
    return data;
};
