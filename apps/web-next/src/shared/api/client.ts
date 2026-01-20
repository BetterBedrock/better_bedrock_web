import { Configuration } from "@/shared/api/openapi";
import { baseUrl } from "@/shared/lib/url";
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

export const axiosCustomInstance: AxiosInstance = axios.create();

axiosCustomInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        return { error: (error.response?.data as { message?: string })?.message };
    },
);

export const baseApiConfig = new Configuration({
    basePath: baseUrl,
});
