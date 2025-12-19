"use server";

import { fetchSecret } from "@/lib/user"
import { postRatingRequest } from "@/services/project-service";

export const postRating = async (id: string, rating: number) => {
    const secret = await fetchSecret();

    const { data } = await postRatingRequest(id, rating, secret);

    return data;
}