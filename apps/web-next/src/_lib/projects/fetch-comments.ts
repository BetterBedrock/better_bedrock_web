"use server";

import { fetchCommentsRequest } from "@/_services";

export const fetchComments = async (id: string) => {
    const { data } = await fetchCommentsRequest(id);
    return data;
}