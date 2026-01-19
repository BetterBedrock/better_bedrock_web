"use server";

import { fetchSecret } from "@/shared/lib/auth";
import { submitProjectRequest } from "@/entities/project/api/project-service";

export const submitProject = async (id: string) => {
    const secret = await fetchSecret();

    const { data, error } = await submitProjectRequest(id, secret);

    return { data, error };
};
