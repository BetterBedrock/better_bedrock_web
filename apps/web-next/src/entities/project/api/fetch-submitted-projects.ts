"use server";

import { fetchSecret } from "@/lib/user";
import { fetchSubmittedProjectsRequest } from "@/entities/project/api/project-service";

export const fetchSubmittedProjects = async () => {
    const secret = await fetchSecret();

    const { data } = await fetchSubmittedProjectsRequest(secret);
    return data;
};
