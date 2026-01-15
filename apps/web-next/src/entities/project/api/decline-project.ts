"use server";

import { fetchSecret } from "@/lib/user";
import { declineProjectRequest } from "@/entities/project/api/project-service";

export const declineProject = async (id: string, errorMessage: string) => {
    const secret = await fetchSecret();

    const { data, error } = await declineProjectRequest(id, errorMessage, secret);

    return { data, error };
};
