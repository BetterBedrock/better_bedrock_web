"use server";

import { fetchSecret } from "@/_lib/user"
import { deleteRatingRequest } from "@/_services/project-service";

export const deleteRating = async (id: string) => {
    const secret = await fetchSecret();

    const { data } = await deleteRatingRequest(id, secret);

    return data;
}