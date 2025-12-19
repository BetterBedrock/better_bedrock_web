"use server";

import { fetchSecret } from "@/lib/user";
import { fetchSubmittedProjectsRequest } from "@/services/project-service";

export const fetchSubmittedProjects = async () => {
    const secret = await fetchSecret();

    const { data } = await fetchSubmittedProjectsRequest(secret);
    return data;
}