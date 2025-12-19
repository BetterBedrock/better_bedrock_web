import { fetchSecret } from "@/lib/user";
import { createProjectRequest } from "@/services/project-service";

export const createProject = async (title: string) => {
    const secret = await fetchSecret();
    const { data } = await createProjectRequest(title, secret);
    return data;
};