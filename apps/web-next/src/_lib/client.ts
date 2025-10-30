import { Configuration } from "@/_lib/api";
import { baseUrl } from "@/utils/url";

export const baseApiConfig = new Configuration({
    basePath: baseUrl,
});