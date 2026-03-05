"use server";

import { searchProjects } from "@/entities/project/api/search-projects";

export const fetchInitialProjects = async (page: number) => {
    const searchResults = await searchProjects(
        undefined,
        undefined,
        undefined,
        page,
    );

    return { currentPage: page, searchResults };
};
