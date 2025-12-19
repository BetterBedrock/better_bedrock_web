"use server";

import { fetchSecret } from "@/lib/user"
import { postCommentRequest } from "@/services/project-service";

export const postComment = async (id: string, content: string) => {
    const secret = await fetchSecret();

    const { data } = await postCommentRequest(id, content, secret);
    return data;
}