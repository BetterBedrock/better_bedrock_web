import { generateDownloadRequest } from "@/entities/downloads/api/downloads-service";

export const generateDownload = async (id: string) => {
    const { data } = await generateDownloadRequest(id);
    return data;
};
