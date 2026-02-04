"use server";

import { fetchSecret } from "@/shared/lib/auth";
import { findUserByIdRequest } from "@/entities/user/api/user-service";

export const fetchUserById = async (id: string) => {
    const secret = await fetchSecret();
    const { data } = await findUserByIdRequest(id, secret);

    return data;
};
