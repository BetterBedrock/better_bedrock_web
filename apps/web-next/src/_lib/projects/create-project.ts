import { fetchSecret } from "@/_lib/user";
import { createProjectRequest } from "@/_services";

export const createProject = async (title: string) => {
    const secret = await fetchSecret();
    const { data } = await createProjectRequest(title, secret);
    return data;
};