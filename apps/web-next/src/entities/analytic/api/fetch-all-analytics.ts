"use server";

import { fetchSecret } from "@/shared/lib/auth";
import { fetchAllAnalyticsRequest } from "@/entities/analytic/api/analytics-service";

export const fetchAllAnalytics = async () => {
    const secret = await fetchSecret();
    const { data } = await fetchAllAnalyticsRequest(secret);

    return data;
};
