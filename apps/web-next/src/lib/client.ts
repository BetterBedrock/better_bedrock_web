import { Configuration } from "@/lib/api";
import { baseUrl } from "@/utils/url";
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

export const axiosCustomInstance: AxiosInstance = axios.create();

axiosCustomInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        return { error: (error.response?.data as { message?: string })?.message };
    }
);

export const baseApiConfig = new Configuration({
    basePath: baseUrl,
});