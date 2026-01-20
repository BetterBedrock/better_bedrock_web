"use server";

import { fetchSecret } from "@/lib/user";
import { deleteCommentRequest } from "@/entities/project/api/project-service";

export const deleteComment = async (id: string) => {
    const secret = await fetchSecret();

    const { data } = await deleteCommentRequest(id, secret);
    return data;
};
