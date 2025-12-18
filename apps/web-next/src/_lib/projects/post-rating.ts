"use server";

import { fetchSecret } from "@/_lib/user"
import { postRatingRequest } from "@/_services/project-service";

export const postRating = async (id: string, rating: number) => {
    const secret = await fetchSecret();

    const { data } = await postRatingRequest(id, rating, secret);

    return data;
}