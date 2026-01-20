"use server";

import { fetchSecret } from "@/lib/user";
import { cancelSubmissionRequest } from "@/entities/project/api/project-service";

export const cancelProject = async (id: string) => {
    const secret = await fetchSecret();

    const { data, error } = await cancelSubmissionRequest(id, secret);

    return { data, error };
};
