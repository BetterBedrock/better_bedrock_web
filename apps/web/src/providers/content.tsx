import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useNotification } from "~/providers/notification";
import { baseUrl } from "~/utils/url";
import { Configuration, ContentApi, DownloadApi, DownloadsDto, DownloadsItemDto } from "~/lib/api";

interface ContentContextProps {
  fetched: boolean;
  downloading: boolean;
  downloadProgress: number;
  downloadItem: DownloadsItemDto | undefined;
  downloads: DownloadsDto | undefined;
  generateDownload: (file: string) => Promise<void>;
  verifyDownload: (hash?: string, code?: string) => Promise<DownloadsItemDto | undefined>;
  download: (code?: string) => Promise<void>;
  openLinkvertise: () => Promise<void>;
}

interface ContentProviderProps {
  children: ReactNode;
}

const ContentContext = createContext<ContentContextProps | undefined>(undefined);

export const ContentProvider = ({ children }: ContentProviderProps) => {
  const { throwError } = useNotification();

  const [fetched, setFetched] = useState<boolean>(false);
  const [downloading, setDownloading] = useState<boolean>(false);
  const [downloads, setDownloads] = useState<DownloadsDto | undefined>();
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadItem, setDownloadItem] = useState<DownloadsItemDto | undefined>(undefined);

  const config = new Configuration({ basePath: baseUrl });

  const downloadApi = new DownloadApi(config);
  const contentApi = new ContentApi(config);

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
    const chunks: Uint8Array[] = [];
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

  const fetchDownloads = async () => {
    try {
      const { data } = await contentApi.contentControllerDownloads();
      setFetched(true);
      setDownloads(data as unknown as DownloadsDto);
    } catch (err) {
      throwError(err, "Failed to fetch downloads");
    }
  };

  const generateDownload = async (file: string) => {
    try {
      await downloadApi.downloadControllerGenerate(file);
    } catch (err) {
      throwError(err, "Failed to generate download");
    }
  };

  const verifyDownload = async (
    hash?: string,
    code?: string,
  ): Promise<DownloadsItemDto | undefined> => {
    try {
      const { data } = await downloadApi.downloadControllerVerify(hash, code);
      const downloadItem = data as unknown as DownloadsItemDto;
      setDownloadItem(downloadItem);

      return downloadItem;
    } catch (err) {
      throwError(err, "Failed to verify download");
      throw err;
    }
  };

  const openLinkvertise = async () : Promise<void> => {
    // const currentUrl = new URL(window.location.origin);
    // const segments = currentUrl.pathname.split("/").filter(Boolean);
    // segments.push("verify");
    // currentUrl.pathname = "/" + segments.join("/");

    // const linkvertiseId = import.meta.env.VITE_LINKVERTISE_ID;
    // const baseUrl = `https://link-to.net/${linkvertiseId}/${Math.random() * 1000}/dynamic/`;

    // const encodedUri = currentUrl.toString();
    // const base64Encoded = btoa(encodedUri);

    // const href = `${baseUrl}?r=${base64Encoded}`;
    // const finalUri = new URL(href);

    // window.open(finalUri.toString(), "_blank");

    const linkvertiseId = import.meta.env.VITE_LINKVERTISE_ID;

    const targetUrl = "https://betterbedrock.com/verify";
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
      let part1: Uint8Array, part2: string;
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
      const baseUrl = `https://link-to.net/${linkvertiseId}/${Math.floor(Math.random() * 1000)}/dynamic/`;

      const finalUri = new URL(`${baseUrl}?r=${fullEncryptedHref}&v=2`);
      window.open(finalUri.toString(), "_blank");
  };

  useEffect(() => {
    fetchDownloads();
  }, []);

  return (
    <ContentContext.Provider
      value={{
        downloadProgress,
        fetched,
        downloading,
        download,
        downloads,
        generateDownload,
        verifyDownload,
        downloadItem,
        openLinkvertise,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);

  if (!context) {
    throw Error("Context useContent must be used within ContentProvider");
  }

  return context;
};
