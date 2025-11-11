"use server";

import { fetchSecret } from "@/_lib/user";
import { fetchSubmittedProjectsRequest } from "@/_services";

export const fetchSubmittedProjects = async () => {
    const secret = await fetchSecret();

    const { data } = await fetchSubmittedProjectsRequest(secret);
    return data;
}