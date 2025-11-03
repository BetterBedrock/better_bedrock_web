import { fetchSecret } from "@/_lib/user/fetch-secret";
import { fetchUserAnalyticsRequest } from "@/_services/analytics-service";

export const fetchUserAnalytics = async (id: string) => {
    const secret = await fetchSecret();

    const { data } = await fetchUserAnalyticsRequest(id, secret);
    return data;
}