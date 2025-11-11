"use server";

import { UpdateProjectDto } from "@/_lib/api";
import { fetchSecret } from "@/_lib/user";
import { updateProjectRequest } from "@/_services";

export const updateProject = async (id: string, project: UpdateProjectDto) => {
    const secret = await fetchSecret();
    const { data } = await updateProjectRequest(id, project, secret);

    return data;
}