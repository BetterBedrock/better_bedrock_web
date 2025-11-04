"use server";

import { fetchSecret } from "@/_lib/user"
import { deleteRatingRequest } from "@/_services";

export const deleteRating = async (id: string) => {
    const secret = await fetchSecret();

    const { data } = await deleteRatingRequest(id, secret);

    return data;
}