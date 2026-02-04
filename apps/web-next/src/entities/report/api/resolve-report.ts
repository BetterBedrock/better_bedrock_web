"use server";

import { fetchSecret } from "@/shared/lib/auth";
import { resolveReportRequest } from "@/entities/report/api/report-service";

export const resolveReport = async (id: string) => {
    const secret = await fetchSecret();
    const { data } = await resolveReportRequest(id, secret);

    return data;
};
