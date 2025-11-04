"use server";

import { fetchProjectsBasicInfoRequest } from "@/_services/project-service"

export const fetchProjectsBasicInfo = async (ids: string[]) => {
    const { data } = await fetchProjectsBasicInfoRequest(ids);
    return data;
}