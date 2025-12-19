import { ProjectType, SearchOrder } from "@/lib/api";
import { searchProjectsRequest } from "@/services/project-service"

export const fetchSearchResults = async (type?: ProjectType, order?: SearchOrder | undefined, text?: string, page?: number) => {
    const { data } = await searchProjectsRequest(type, order, text, page);

    return data;
}