"use server";

import { fetchSecret } from "@/lib/user";
import { fetchAllAnalyticsRequest } from "@/entities/analytics/api/analytics-service";

export const fetchAllAnalytics = async () => {
    const secret = await fetchSecret();
    const { data } = await fetchAllAnalyticsRequest(secret);

    return data;
};
