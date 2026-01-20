"use server";

import { fetchSecret } from "@/lib/user";
import { deleteRatingRequest } from "@/entities/project/api/project-service";

export const deleteRating = async (id: string) => {
    const secret = await fetchSecret();

    const { data } = await deleteRatingRequest(id, secret);

    return data;
};
