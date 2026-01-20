"use server";

import { fetchSecret } from "@/lib/user";
import { deleteProductionProjectRequest } from "@/entities/project/api/project-service";

export const deleteProductionProject = async (id: string) => {
    const secret = await fetchSecret();

    const { data, error } = await deleteProductionProjectRequest(id, secret);

    return { data, error };
};
