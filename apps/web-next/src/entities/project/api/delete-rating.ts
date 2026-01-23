"use server";

import { fetchSecret } from "@/shared/lib/auth";
import { deleteRatingRequest } from "@/entities/project/api/project-service";

export const deleteRating = async (id: string) => {
    const secret = await fetchSecret();

    const { data } = await deleteRatingRequest(id, secret);

    return data;
};
