import { DownloadApi } from "@/shared/lib/openapi";
import { axiosCustomInstance, baseApiConfig } from "@/shared/lib/utils";

const downloadApi = new DownloadApi(
    baseApiConfig,
    undefined,
    axiosCustomInstance,
);

export const generateDownloadRequest = async (id: string) =>
    downloadApi.downloadControllerGenerate(id);

export const verifyDownloadRequest = async (
    hash?: string,
    code?: string,
    secret?: string,
) =>
    downloadApi.downloadControllerVerify(hash, code, {
        headers: { Authorization: `Bearer ${secret}` },
    });
