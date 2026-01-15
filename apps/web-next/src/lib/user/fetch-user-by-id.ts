"use server";

import { fetchSecret } from "@/lib/user/fetch-secret";
import { findUserByIdRequest } from "@/services/user-service";

export const fetchUserById = async (id: string) => {
    const secret = await fetchSecret();
    const { data } = await findUserByIdRequest(id, secret);

    return data;
}