"use server";

import { ReportProjectBodyDto } from "@/shared/api/openapi";
import { fetchSecret } from "@/lib/user";
import { reportProjectRequest } from "@/entities/report/api/report-service";

export const reportProject = async (
    id: string,
    reportProjectData: ReportProjectBodyDto,
) => {
    const secret = await fetchSecret();
    const { data } = await reportProjectRequest(id, reportProjectData, secret);

    return data;
};
