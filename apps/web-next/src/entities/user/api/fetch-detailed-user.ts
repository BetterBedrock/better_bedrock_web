"use server";

import { fetchSecret } from "@/shared/lib/auth";
import { fetchDetailedUserRequest } from "@/entities/user/api/user-service";

export const fetchDetailedUser = async (id: string) => {
    const secret = await fetchSecret();
    const { data } = await fetchDetailedUserRequest(id, secret);

    return data;
};
