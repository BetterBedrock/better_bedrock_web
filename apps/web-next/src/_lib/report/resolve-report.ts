"use server";

import { fetchSecret } from "@/_lib/user";
import { resolveReportRequest } from "@/_services/report-service";

export const resolveReport = async (id: string) => {
    const secret = await fetchSecret();
    const { data } = await resolveReportRequest(id, secret);

    return data;
}