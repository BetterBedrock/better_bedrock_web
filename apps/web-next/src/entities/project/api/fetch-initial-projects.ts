"use server";

import { searchProjects } from "@/entities/project/api/search-projects";
import { ProjectType, SearchOrder } from "@/shared/lib/openapi";

export const fetchInitialProjects = async (page: number, type?: ProjectType, order?: SearchOrder, search?: string) => {
    const searchResults = await searchProjects(
        type,
        order,
        search,
        page,
    );

    return { currentPage: page, searchResults };
};
