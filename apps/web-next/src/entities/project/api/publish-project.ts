"use server";

import { fetchSecret } from "@/shared/lib/auth";
import { publishProjectRequest } from "@/entities/project/api/project-service";

export const publishProject = async (id: string) => {
    const secret = await fetchSecret();

    const { data, error } = await publishProjectRequest(id, secret);

    return { data, error };
};
