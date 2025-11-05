import { DownloadApi } from "@/_lib/api";
import { baseApiConfig } from "@/_lib/client";

const downloadApi = new DownloadApi(baseApiConfig);

export const generateDownloadRequest = async (id: string) => downloadApi.downloadControllerGenerate(id);

export const verifyDownloadRequest = async (hash?: string, code?: string, secret?: string) => downloadApi.downloadControllerVerify(hash, code, { headers: { Authorization: `Bearer ${secret}` } });