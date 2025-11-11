"use server";

import { ReportProjectBodyDto } from "@/_lib/api";
import { fetchSecret } from "@/_lib/user";
import { reportProjectRequest } from "@/_services/report-service";

export const reportProject = async (id: string, reportProjectData: ReportProjectBodyDto) => {
    const secret = await fetchSecret();
    const { data } = await reportProjectRequest(id, reportProjectData, secret);

    return data;
}