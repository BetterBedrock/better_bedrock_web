"use server";

import { searchProjects } from "@/entities/project/api/search-projects";

interface FetchInitialProjectsProps {
    params: { page?: string[] | undefined };
}

const getCurrentPaginationPage = (page?: string[] | undefined) => {
    let currentPage = 1;

    if (page && page.length > 1 && page[0] === "page") {
        currentPage = parseInt(page[1], 10) || 1;
    }

    return currentPage;
};

export const fetchInitialProjects = async ({
    params,
}: FetchInitialProjectsProps) => {
    const currentPage = getCurrentPaginationPage(params.page);

    const searchResults = await searchProjects(
        undefined,
        undefined,
        undefined,
        currentPage,
    );

    return { currentPage, searchResults };
};
