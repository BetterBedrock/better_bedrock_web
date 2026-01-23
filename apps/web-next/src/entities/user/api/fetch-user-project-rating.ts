"use server";

import { fetchSecret } from "@/shared/lib/auth";
import { fetchUserProjectRatingRequest } from "@/entities/user/api/user-service";

export const fetchUserProjectRating = async (id: string) => {
    const secret = await fetchSecret();
    const { data } = await fetchUserProjectRatingRequest(id, secret);

    return data;
};
