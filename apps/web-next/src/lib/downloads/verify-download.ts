import { fetchSecret } from "@/lib/user";
import { verifyDownloadRequest } from "@/services/downloads-service";

export const verifyDownload = async (hash?: string, code?: string) => {
    const secret = await fetchSecret();

    try {
        const { data } = await verifyDownloadRequest(hash, code, secret);
        return data;
    } catch (_) {
        return null;
    }
}