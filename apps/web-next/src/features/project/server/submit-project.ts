"use server";

import { fetchSecret } from "@/lib/user";
import { submitProjectRequest } from "@/services/project-service"

export const submitProject = async (id: string) => {
    const secret = await fetchSecret();

    const { data, error } = await submitProjectRequest(id, secret);

    return { data, error };
}