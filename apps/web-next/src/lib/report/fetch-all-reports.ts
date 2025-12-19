"use server";

import { fetchSecret } from "@/lib/user";
import { fetchAllReportsRequest } from "@/services/report-service";

export const fetchAllReports = async () => {
    const secret = await fetchSecret();
    const { data } = await fetchAllReportsRequest(secret);

    return data;
}