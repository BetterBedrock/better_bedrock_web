"use server";

import { fetchSecret } from "@/lib/user";
import { fetchUserProjectsRequest } from "@/entities/project/api/project-service";

export const fetchUserProjects = async (id: string) => {
    const secret = await fetchSecret();
    const { data } = await fetchUserProjectsRequest(id, secret);
    return data.filter((d) => d.draft === false);
};
