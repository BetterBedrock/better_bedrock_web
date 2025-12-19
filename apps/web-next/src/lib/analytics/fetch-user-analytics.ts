import { fetchSecret } from "@/lib/user/fetch-secret";
import { fetchUserAnalyticsRequest } from "@/services/analytics-service";

export const fetchUserAnalytics = async (id: string) => {
    const secret = await fetchSecret();

    const { data } = await fetchUserAnalyticsRequest(id, secret);
    return data;
}