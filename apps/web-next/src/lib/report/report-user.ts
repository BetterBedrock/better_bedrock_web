"use server";

import { ReportProjectBodyDto } from "@/shared/api/openapi";
import { fetchSecret } from "@/lib/user";
import { reportUserRequest } from "@/entities/report/api/report-service";

export const reportUser = async (
    id: string,
    reportProjectData: ReportProjectBodyDto,
) => {
    const secret = await fetchSecret();
    const { data } = await reportUserRequest(id, reportProjectData, secret);

    return data;
};
