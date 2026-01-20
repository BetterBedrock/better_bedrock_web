import { searchProjects } from "@/entities/project/api/search-projects";
import { getCurrentPaginationPage } from "@/lib/utils/get-current-pagination-page";

interface FetchInitialProjectsProps {
    params: { page?: string[] | undefined };
}

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
