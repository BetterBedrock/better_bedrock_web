"use server";

import { ReportProjectBodyDto } from "@/lib/api";
import { fetchSecret } from "@/lib/user";
import { reportProjectRequest } from "@/services/report-service";

export const reportProject = async (id: string, reportProjectData: ReportProjectBodyDto) => {
    const secret = await fetchSecret();
    const { data } = await reportProjectRequest(id, reportProjectData, secret);

    return data;
}