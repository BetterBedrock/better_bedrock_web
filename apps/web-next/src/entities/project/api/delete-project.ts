"use server";

import { fetchSecret } from "@/shared/lib/auth";
import { deleteProjectRequest } from "@/entities/project/api/project-service";

export const deleteProject = async (id: string) => {
    const secret = await fetchSecret();

    const { data, error } = await deleteProjectRequest(id, secret);

    return { data, error };
};
