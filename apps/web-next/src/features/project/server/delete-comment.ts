"use server";

import { fetchSecret } from "@/lib/user"
import { deleteCommentRequest } from "@/services/project-service";

export const deleteComment = async (id: string) => {
    const secret = await fetchSecret();

    const { data } = await deleteCommentRequest(id, secret);
    return data;
}