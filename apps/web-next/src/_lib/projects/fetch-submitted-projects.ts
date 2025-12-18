"use server";

import { fetchSecret } from "@/_lib/user";
import { fetchSubmittedProjectsRequest } from "@/_services/project-service";

export const fetchSubmittedProjects = async () => {
    const secret = await fetchSecret();

    const { data } = await fetchSubmittedProjectsRequest(secret);
    return data;
}