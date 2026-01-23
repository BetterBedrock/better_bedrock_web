"use server";

import { fetchSecret } from "@/shared/lib/auth";
import { fetchAllReportsRequest } from "@/entities/report/api/report-service";

export const fetchAllReports = async () => {
    const secret = await fetchSecret();
    const { data } = await fetchAllReportsRequest(secret);

    return data;
};
