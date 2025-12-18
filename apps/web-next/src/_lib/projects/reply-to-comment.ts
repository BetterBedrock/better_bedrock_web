"use server";

import { fetchSecret } from "@/_lib/user"
import { replyToCommentRequest } from "@/_services/project-service";

export const replyToComment = async (id: string, parentId: string, content: string) => {
    const secret = await fetchSecret();

    const { data } = await replyToCommentRequest(id, parentId, content, secret);
    return data;
}