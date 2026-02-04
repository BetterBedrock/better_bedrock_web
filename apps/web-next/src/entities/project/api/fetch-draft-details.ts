"use server";

import { fetchSecret } from "@/shared/lib/auth";
import { fetchDraftDetailsRequest } from "@/entities/project/api/project-service";

export const fetchDraftDetails = async (id: string) => {
    const secret = await fetchSecret();
    const { data } = await fetchDraftDetailsRequest(id, secret);
    return data;
};
