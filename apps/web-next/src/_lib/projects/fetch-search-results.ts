import { ProjectType, SearchOrder } from "@/_lib/api";
import { searchProjectsRequest } from "@/_services/project-service"

export const fetchSearchResults = async (type?: ProjectType, order?: SearchOrder | undefined, text?: string, page?: number) => {
    const { data } = await searchProjectsRequest(type, order, text, page);

    return data;
}