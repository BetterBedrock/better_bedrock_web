"use server";

import { ReportProjectBodyDto } from "@/lib/api";
import { fetchSecret } from "@/lib/user";
import { reportUserRequest } from "@/services/report-service";

export const reportUser = async (id: string, reportProjectData: ReportProjectBodyDto) => {
    const secret = await fetchSecret();
    const { data } = await reportUserRequest(id, reportProjectData, secret);

    return data;
}