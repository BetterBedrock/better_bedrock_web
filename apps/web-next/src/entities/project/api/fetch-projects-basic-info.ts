"use server";

import { fetchProjectsBasicInfoRequest } from "@/entities/project/api/project-service";

export const fetchProjectsBasicInfo = async (ids: string[]) => {
    const { data } = await fetchProjectsBasicInfoRequest(ids);
    return data;
};
