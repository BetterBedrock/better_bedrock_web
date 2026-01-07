"use server";

import { UpdateProjectDto } from "@/lib/api";
import { fetchSecret } from "@/lib/user";
import { updateProjectRequest } from "@/services/project-service";

export const updateProject = async (id: string, project: UpdateProjectDto) => {
    const secret = await fetchSecret();

    const { data, error } = await updateProjectRequest(id, project, secret);

    return { data, error };
}