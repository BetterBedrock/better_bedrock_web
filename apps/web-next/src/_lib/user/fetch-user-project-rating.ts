"use server";

import { fetchSecret } from "@/_lib/user/fetch-secret"
import { fetchUserProjectRatingRequest } from "@/_services"

export const fetchUserProjectRating = async (id: string) => {
    const secret = await fetchSecret();
    const { data } = await fetchUserProjectRatingRequest(id, secret);

    return data;
}