import { AnalyticsApi, Configuration } from "@/shared/lib/openapi";
import { axiosCustomInstance } from "@/shared/lib/utils";
import { baseUrl } from "@/shared/lib/utils";

const config = new Configuration({
    basePath: baseUrl,
});

const analyticsApi = new AnalyticsApi(config, undefined, axiosCustomInstance);

export const fetchAllAnalyticsRequest = async (secret: string) =>
    analyticsApi.analyticsControllerAnalytics({
        headers: { Authorization: `Bearer ${secret}` },
    });

export const fetchUserAnalyticsRequest = async (id: string, secret: string) =>
    analyticsApi.analyticsControllerUser(id, {
        headers: { Authorization: `Bearer ${secret}` },
    });
