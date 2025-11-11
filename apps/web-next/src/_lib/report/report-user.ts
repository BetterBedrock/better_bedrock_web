"use server";

import { ReportProjectBodyDto } from "@/_lib/api";
import { fetchSecret } from "@/_lib/user";
import { reportUserRequest } from "@/_services/report-service";

export const reportUser = async (id: string, reportProjectData: ReportProjectBodyDto) => {
    const secret = await fetchSecret();
    const { data } = await reportUserRequest(id, reportProjectData, secret);

    return data;
}