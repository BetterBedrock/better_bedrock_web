"use server";

import { fetchSecret } from "@/lib/user";
import { fetchDraftDetailsRequest } from "@/entities/project/api/project-service";

export const fetchDraftsDetails = async (id: string) => {
    const secret = await fetchSecret();
    const { data } = await fetchDraftDetailsRequest(id, secret);
    return data;
};
