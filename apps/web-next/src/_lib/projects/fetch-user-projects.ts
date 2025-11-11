import { fetchSecret } from "@/_lib/user";
import { fetchUserProjectsRequest } from "@/_services/project-service";

export const fetchUserProjects = async (id: string) => {
    const secret = await fetchSecret();
    const { data } = await fetchUserProjectsRequest(id, secret);
    return data.filter((d) => d.draft === false);
}