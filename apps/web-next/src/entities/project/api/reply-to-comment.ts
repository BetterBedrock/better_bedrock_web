"use server";

import { fetchSecret } from "@/shared/lib/auth";
import { replyToCommentRequest } from "@/entities/project/api/project-service";

export const replyToComment = async (
    id: string,
    parentId: string,
    content: string,
) => {
    const secret = await fetchSecret();

    const { data } = await replyToCommentRequest(id, parentId, content, secret);
    return data;
};
