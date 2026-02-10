import { Configuration } from "@/shared/lib/openapi";
import { baseUrl } from "@/shared/lib/utils";
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

export const axiosCustomInstance: AxiosInstance = axios.create();

axiosCustomInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        return { error: (error.response?.data as { message?: string })?.message?.[0] };
    },
);

export const baseApiConfig = new Configuration({
    basePath: baseUrl,
});
