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
  openLinkvertise: () => void;
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

  const openLinkvertise = () => {
    const currentUrl = new URL(window.location.origin);
    const segments = currentUrl.pathname.split("/").filter(Boolean);
    segments.push("verify");
    currentUrl.pathname = "/" + segments.join("/");

    const linkvertiseId = import.meta.env.VITE_LINKVERTISE_ID;
    const baseUrl = `https://link-to.net/${linkvertiseId}/${Math.random() * 1000}/dynamic/`;

    const encodedUri = currentUrl.toString();
    const base64Encoded = btoa(encodedUri);

    const href = `${baseUrl}?r=${base64Encoded}`;
    const finalUri = new URL(href);

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
