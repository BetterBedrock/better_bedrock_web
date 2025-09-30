import { createContext, ReactNode, useContext, useState } from "react";
import { useNotification } from "~/providers/notification";
import { baseUrl } from "~/utils/url";
import { Configuration, DownloadApi, ProjectDto } from "~/lib/api";
import { useCookies } from "react-cookie";

interface DownloadContextProps {
  downloading: boolean;
  downloadProgress: number;
  downloadItem: ProjectDto | undefined;
  generateDownload: (project: ProjectDto) => Promise<void>;
  verifyDownload: (hash?: string, code?: string) => Promise<void>;
  download: (code?: string) => Promise<void>;
  openLinkvertise: (linkvertiseId: string) => Promise<void>;
  getLinkvertiseUrl: (linkvertiseId: string) => Promise<string>;
}

interface DownloadProviderProps {
  children: ReactNode;
}

const DownloadContext = createContext<DownloadContextProps | undefined>(undefined);

export const DownloadProvider = ({ children }: DownloadProviderProps) => {
  const { throwError } = useNotification();
  const [cookie] = useCookies(["secret"]);

  const [downloading, setDownloading] = useState<boolean>(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const [downloadItem, setDownloadItem] = useState<ProjectDto | undefined>(undefined);

  const config = new Configuration({ basePath: baseUrl, accessToken: cookie.secret });

  const downloadApi = new DownloadApi(config);

  const download = async () => {
    if (downloadProgress > 0 && downloading) return;
    setDownloading(true);
    setDownloadProgress(0);

    const downloadUrl = `${baseUrl}/download`;
    const response = await fetch(downloadUrl);

    if (!response.ok || !response.body) {
      const json = await response.json();
      if (json.message) {
        throwError(null, json.message);
      }
      return;
    }

    const contentLength = response.headers.get("Content-Length");
    const total = contentLength ? parseInt(contentLength, 10) : NaN;
    const contentType = response.headers.get("Content-Type") || "application/octet-stream";

    const reader = response.body.getReader();
    const chunks: BlobPart[] = [];
    let loaded = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) {
        chunks.push(value);
        loaded += value.length;
        if (!isNaN(total)) {
          setDownloadProgress(Math.floor((loaded / total) * 100));
        }
      }
    }

    const blob = new Blob(chunks, { type: contentType });

    // Extract filename from headers (if present)
    const disposition = response.headers.get("Content-Disposition") || "";
    const filenameMatch = /filename\*=UTF-8''([^;]+)|filename="([^"]+)"/.exec(disposition);
    let filename = filenameMatch
      ? decodeURIComponent(filenameMatch[1] || filenameMatch[2])
      : "download";

    // Ensure filename has an extension, otherwise default to .mcpack
    if (!/\.[a-z0-9]+$/i.test(filename)) {
      filename += ".mcpack";
    }

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);

    setDownloadProgress(100);
    setDownloading(false);
  };

  const generateDownload = async (project: ProjectDto) => {
    try {
      await downloadApi.downloadControllerGenerate(project.id);
      setDownloadItem(project);
    } catch (err) {
      throwError(err, "Failed to generate download");
    }
  };

  const verifyDownload = async (hash?: string, code?: string) => {
    try {
      const { data } = await downloadApi.downloadControllerVerify(hash, code);
      setDownloadItem(data);
    } catch (err) {
      throwError(err, "Failed to verify download");
      throw err;
    }
  };

  const openLinkvertise = async (linkvertiseId: string) => {
    const link = await getLinkvertiseUrl(linkvertiseId);
    const finalUri = new URL(link);

    window.open(finalUri.toString(), "_blank");
  };

  const getLinkvertiseUrl = async (linkvertiseId: string): Promise<string> => {
    const targetUrl = baseUrl + "/verify";
    const pemEncodedKey = `-----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1piHDY9WRIehbfC3Fpol
    Ly/WrJF8TKFVdDMobj3fkNjN/69dTv9JgXt+gcJxVn/h4NCMtQ2mCQXNBMXzLOky
    HJipiFMoyPtOOlMlbWRAiaQE1GpMebGNRcsxYnWzF53v63+hUQgrMahH9X0Ii/NJ
    hvDyFlPX77+z9xiyd45L+xrgayePpOxvQpj6VJDlpNNKWbuIkFvkMmUVRM2TLulL
    JSgs4EgoBZgTYRpmhgR8tYfDOW+cOctffggcMAzKUC2CzYNmhzX15O7DKaZdYgfa
    BR/hqvyNAxBepHOJnBfHkQqaox5diHGqdwXXLwiJKzoK5R26vaI3jg2+d69VPSGL
    0QIDAQAB
    -----END PUBLIC KEY-----`;

    function str2ab(str: string): ArrayBuffer {
      const buf = new ArrayBuffer(str.length);
      const bufView = new Uint8Array(buf);
      for (let i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
      }
      return buf;
    }

    async function importKey(pem: string): Promise<CryptoKey> {
      const pemHeader = "-----BEGIN PUBLIC KEY-----";
      const pemFooter = "-----END PUBLIC KEY-----";
      const pemContents = pem.substring(pemHeader.length, pem.length - pemFooter.length - 1);
      const binaryDer = str2ab(atob(pemContents));
      return await crypto.subtle.importKey(
        "spki",
        binaryDer,
        { name: "RSA-OAEP", hash: "SHA-256" },
        false,
        ["encrypt"],
      );
    }

    const encodedHref = new TextEncoder().encode(targetUrl);

    // Split into two parts like the official script
    let part1: BufferSource, part2: string;
    if (encodedHref.length > 70) {
      part1 = encodedHref.slice(0, 70);
      part2 = new TextDecoder().decode(encodedHref.slice(70));
    } else {
      part1 = encodedHref;
      part2 = "";
    }

    const key = await importKey(pemEncodedKey);
    const encryptedHref = await crypto.subtle.encrypt({ name: "RSA-OAEP" }, key, part1);

    // Convert encrypted part to base64
    let binary = "";
    const bytes = new Uint8Array(encryptedHref);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const encryptedBase64 = btoa(binary);

    const fullEncryptedHref = `${encryptedBase64}${part2}`;
    const baseLinkvertiseUrl = `https://link-to.net/${linkvertiseId}/${Math.floor(Math.random() * 1000)}/dynamic/`;

    return `${baseLinkvertiseUrl}?r=${fullEncryptedHref}&v=2`;
  };

  return (
    <DownloadContext.Provider
      value={{
        downloading,
        downloadProgress,
        downloadItem,
        generateDownload,
        verifyDownload,
        download,
        openLinkvertise,
        getLinkvertiseUrl,
      }}
    >
      {children}
    </DownloadContext.Provider>
  );
};

export const useDownload = () => {
  const context = useContext(DownloadContext);

  if (!context) {
    throw Error("Context useDownload must be used within DownloadProvider");
  }

  return context;
};
