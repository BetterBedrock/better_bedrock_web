import { AnalyticsApi, Configuration } from "@/_lib/api";
import { axiosCustomInstance } from "@/_lib/client";
import { baseUrl } from "@/utils/url";

const config = new Configuration({
    basePath: baseUrl,
});

const analyticsApi = new AnalyticsApi(config, undefined, axiosCustomInstance);

export const fetchAllAnalyticsRequest = async (secret: string) =>
    analyticsApi.analyticsControllerAnalytics({ headers: { "Authorization": `Bearer ${secret}` } });

export const fetchUserAnalyticsRequest = async (
    id: string,
    secret: string,
) =>
    analyticsApi.analyticsControllerUser(id, { headers: { "Authorization": `Bearer ${secret}` } });
