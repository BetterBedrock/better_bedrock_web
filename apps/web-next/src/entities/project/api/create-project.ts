import { fetchSecret } from "@/shared/lib/auth";
import { createProjectRequest } from "@/entities/project/api/project-service";

export const createProject = async (title: string) => {
    const secret = await fetchSecret();
    const { data, error } = await createProjectRequest(title, secret);
    return { data, error };
};
