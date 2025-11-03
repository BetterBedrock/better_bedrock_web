import { AnalyticsApi, Configuration } from "@/_lib/api";
import { baseUrl } from "@/utils/url";

const config = new Configuration({
    basePath: baseUrl,
});

const analyticsApi = new AnalyticsApi(config);

export const fetchUserAnalyticsRequest = async (
    id: string,
    secret: string,
) =>
    await analyticsApi.analyticsControllerUser(id, { headers: { "Authorization": `Bearer ${secret}` } });
