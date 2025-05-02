import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { DownloadItemProps, DownloadListProps } from "~/pages/downloads";
import { $api } from "~/services/api-client";

interface ContentContextProps {
  fetched: boolean;
  downloading: boolean;
  downloadProgress: number;
  downloadItem: DownloadItemProps | undefined;
  downloads: DownloadListProps[];
  generateDownload: (file: string) => Promise<void>;
  verifyDownload: (hash: string) => Promise<DownloadItemProps>;
  download: () => Promise<void>;
}

interface ContentProviderProps {
  children: ReactNode;
}

const ContentContext = createContext<ContentContextProps | undefined>(undefined);

export const ContentProvider = ({ children }: ContentProviderProps) => {
  const [fetched, setFetched] = useState<boolean>(false);
  const [downloading, setDownloading] = useState<boolean>(false);
  const [downloads, setDownloads] = useState<DownloadListProps[]>([]);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadItem, setDownloadItem] = useState<DownloadItemProps | undefined>(undefined);

  // … existing fetchDownloads, generateDownload, verifyDownload …

  const download = async () => {
    if (downloading) {
      return;
    }
    setDownloading(true);
    setDownloadProgress(0);
    // 1. Kick off the generation/verification if needed…
    const downloadUrl = "http://localhost:8084/download";

    // 2. Fetch with streaming:
    const response = await fetch(downloadUrl);
    if (!response.ok || !response.body) {
      console.error("Network error");
      return;
    }
    // Total size from headers:
    const contentLength = response.headers.get("Content-Length");
    const total = contentLength ? parseInt(contentLength, 10) : NaN;

    const reader = response.body.getReader();
    const chunks: Uint8Array[] = [];
    let loaded = 0;

    // 3. Read the stream:
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) {
        chunks.push(value);
        loaded += value.length;
        // Compute % and update state:
        if (!isNaN(total)) {
          setDownloadProgress(Math.floor((loaded / total) * 100));
        }
      }
    }

    // 4. Assemble the blob and trigger download:
    const blob = new Blob(chunks);
    const disposition = response.headers.get("Content-Disposition") || "";
    const filenameMatch = /filename\*=UTF-8''([^;]+)|filename="([^"]+)"/.exec(disposition);
    const filename = filenameMatch
      ? decodeURIComponent(filenameMatch[1] || filenameMatch[2])
      : "download";
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);

    // 5. Done
    setDownloadProgress(100);
    setDownloading(false);
  };

  const fetchDownloads = async () => {
    const { data, error } = await $api.GET("/content/downloads");
    setFetched(true);

    if (error) {
      console.log(error);
      return;
    }

    setDownloads(data as unknown as DownloadListProps[]);
  };

  const generateDownload = async (file: string) => {
    const { error } = await $api.POST("/download/generate", {
      params: {
        query: {
          file,
        },
      },
    });

    if (error) {
      console.log(error);
      return;
    }
  };

  const verifyDownload = async (hash: string): Promise<DownloadItemProps> => {
    const { data, error } = await $api.POST("/download/verify", {
      params: {
        query: {
          hash,
        },
      },
    });

    if (error) {
      throw Error(error);
    }

    const downloadItem = data as unknown as DownloadItemProps;
    setDownloadItem(downloadItem);
    return downloadItem;
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
