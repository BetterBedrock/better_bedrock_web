"use server";

import { fetchSecret } from "@/_lib/user"
import { fetchDraftDetailsRequest } from "@/_services";

export const fetchDraftsDetails = async (id: string) => {
    const secret = await fetchSecret();
    const { data } = await fetchDraftDetailsRequest(id, secret);
    return data;
}