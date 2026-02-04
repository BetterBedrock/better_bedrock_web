"use server";

import { UpdateProjectDto } from "@/shared/lib/openapi";
import { fetchSecret } from "@/shared/lib/auth";
import { updateProjectRequest } from "@/entities/project/api/project-service";

export const updateProject = async (id: string, project: UpdateProjectDto) => {
    const secret = await fetchSecret();

    const { data, error } = await updateProjectRequest(id, project, secret);

    return { data, error };
};
