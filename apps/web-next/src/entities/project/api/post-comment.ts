"use server";

import { fetchSecret } from "@/shared/lib/auth";
import { postCommentRequest } from "@/entities/project/api/project-service";

export const postComment = async (id: string, content: string) => {
    const secret = await fetchSecret();

    const { data, error } = await postCommentRequest(id, content, secret);
    return { data, error };
};
