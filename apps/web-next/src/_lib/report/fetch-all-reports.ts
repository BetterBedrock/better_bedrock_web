"use server";

import { fetchSecret } from "@/_lib/user";
import { fetchAllReportsRequest } from "@/_services/report-service";

export const fetchAllReports = async () => {
    const secret = await fetchSecret();
    const { data } = await fetchAllReportsRequest(secret);

    return data;
}