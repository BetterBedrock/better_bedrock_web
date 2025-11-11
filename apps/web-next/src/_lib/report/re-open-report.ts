"use server";

import { fetchSecret } from "@/_lib/user";
import { reopenReportRequest } from "@/_services/report-service";

export const reOpenReport = async (id: string) => {
    const secret = await fetchSecret();
    const { data } = await reopenReportRequest(id, secret);

    return data;
}