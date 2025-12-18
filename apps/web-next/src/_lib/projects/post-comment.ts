"use server";

import { fetchSecret } from "@/_lib/user"
import { postCommentRequest } from "@/_services/project-service";

export const postComment = async (id: string, content: string) => {
    const secret = await fetchSecret();

    const { data } = await postCommentRequest(id, content, secret);
    return data;
}