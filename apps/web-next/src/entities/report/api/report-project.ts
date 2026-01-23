"use server";

import { ReportProjectBodyDto } from "@/shared/lib/openapi";
import { fetchSecret } from "@/shared/lib/auth";
import { reportProjectRequest } from "@/entities/report/api/report-service";

export const reportProject = async (
    id: string,
    reportProjectData: ReportProjectBodyDto,
) => {
    const secret = await fetchSecret();
    const { data } = await reportProjectRequest(id, reportProjectData, secret);

    return data;
};
