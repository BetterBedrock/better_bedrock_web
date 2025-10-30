import { fetchUserProjects as fetchUserProjectsRequest } from "@/_services/project-service";

export const fetchUserProjects = async (id: string) => {
    const { data } = await fetchUserProjectsRequest(id);
    return data;
}