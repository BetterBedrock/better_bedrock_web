"use server";

import { fetchSecret } from "@/shared/lib/auth";
import { fetchUserAnalyticsRequest } from "@/entities/analytic/api/analytics-service";

export const fetchUserAnalytics = async (id: string) => {
    const secret = await fetchSecret();

    const { data } = await fetchUserAnalyticsRequest(id, secret);
    return data;
};
