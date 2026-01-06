"use server";

import { fetchSecret } from "@/lib/user";
import { deleteProjectRequest } from "@/services/project-service"

export const deleteProject = async (id: string) => {
    const secret = await fetchSecret();

    const { data, error } = await deleteProjectRequest(id, secret);

    return { data, error };
}