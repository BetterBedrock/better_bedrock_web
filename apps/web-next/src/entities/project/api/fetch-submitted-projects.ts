"use server";

import { fetchSecret } from "@/shared/lib/auth";
import { fetchSubmittedProjectssRequest } from "@/entities/project/api/project-service";

export const fetchSubmittedProjects = async () => {
    const secret = await fetchSecret();

    const { data } = await fetchSubmittedProjectssRequest(secret);
    return data;
};
