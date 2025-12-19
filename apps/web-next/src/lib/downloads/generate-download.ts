import { generateDownloadRequest } from "@/services/downloads-service"

export const generateDownload = async (id: string) => {
    const { data } = await generateDownloadRequest(id);
    return data;
}