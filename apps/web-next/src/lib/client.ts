import { Configuration } from "@/lib/api";
import { baseUrl } from "@/utils/url";
import globalAxios from 'axios';

export const axiosCustomInstance = globalAxios;

export const baseApiConfig = new Configuration({
    basePath: baseUrl,
});

axiosCustomInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log(error);
        return { data: null, error: true };
    }
);