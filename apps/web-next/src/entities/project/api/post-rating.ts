"use server";

import { fetchSecret } from "@/shared/lib/auth";
import { postRatingRequest } from "@/entities/project/api/project-service";

export const postRating = async (id: string, rating: number) => {
    const secret = await fetchSecret();

    const { data } = await postRatingRequest(id, rating, secret);

    return data;
};
