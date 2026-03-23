"use server";

import { searchProjects } from "@/entities/project/api/search-projects";
import { ProjectType } from "@/shared/lib/openapi";

export const fetchInitialProjects = async (page: number, type?: ProjectType) => {
    const searchResults = await searchProjects(
        type,
        undefined,
        undefined,
        page,
    );

    return { currentPage: page, searchResults };
};
