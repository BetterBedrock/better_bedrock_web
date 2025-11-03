import { Configuration, ProjectApi, ProjectType, SearchOrder } from "@/_lib/api";
import { baseUrl } from "@/utils/url";

const config = new Configuration({
    basePath: baseUrl,
});

const projectApi = new ProjectApi(config);

export const fetchUserProjects = async (
    id: string,
) =>
    await projectApi.projectControllerUserProjects(id);

export const searchProjectsRequest = async (type?: ProjectType, order?: SearchOrder | undefined, text?: string, page?: number) => await projectApi.projectControllerSearch(
    type,
    order,
    text,
    page
);