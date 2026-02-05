"use server";

import { ProjectType, SearchOrder } from "@/shared/lib/openapi";
import { searchProjectsRequest } from "@/entities/project/api/project-service";

export const searchProjects = async (
    type?: ProjectType,
    order?: SearchOrder | undefined,
    text?: string,
    page?: number,
) => {
    const { data, error } = await searchProjectsRequest(type, order, text, page);
    return data;
};
