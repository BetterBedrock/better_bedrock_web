"use server";

import { fetchSecret } from "@/lib/user";
import { publishProjectRequest } from "@/services/project-service";

export const publishProject = async (id: string) => {
    const secret = await fetchSecret();

    const { data, error } = await publishProjectRequest(id, secret);

    return { data, error };
}