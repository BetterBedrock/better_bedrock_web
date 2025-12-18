"use server";

import { fetchSecret } from "@/_lib/user";
import { fetchAllAnalyticsRequest } from "@/_services/analytics-service";

export const fetchAllAnalytics = async () => {
    const secret = await fetchSecret();
    const { data } = await fetchAllAnalyticsRequest(secret);

    return data;
}