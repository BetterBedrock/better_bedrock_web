import { ProjectType, SearchOrder } from "@/shared/api/openapi";
import { searchProjectsRequest } from "@/entities/project/api/project-service";

export const searchProjects = async (
    type?: ProjectType,
    order?: SearchOrder | undefined,
    text?: string,
    page?: number,
) => {
    const { data } = await searchProjectsRequest(type, order, text, page);

    return data;
};
