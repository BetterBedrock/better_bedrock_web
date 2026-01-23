"use server";

import { fetchSecret } from "@/shared/lib/auth";
import { cancelSubmissionRequest } from "@/entities/project/api/project-service";

export const cancelProject = async (id: string) => {
    const secret = await fetchSecret();

    const { data, error } = await cancelSubmissionRequest(id, secret);

    return { data, error };
};
