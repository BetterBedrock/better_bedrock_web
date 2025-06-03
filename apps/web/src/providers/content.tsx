import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { DownloadItemProps } from "~/pages/downloads";
import { NotificationType, useNotification } from "~/providers/notification";
import { $api } from "~/services/api-client";
import { DownloadsDto } from "@better-bedrock/constants/downloads.dto";
import { baseUrl } from "~/utils/url";

interface ContentContextProps {
  fetched: boolean;
  downloading: boolean;
  downloadProgress: number;
  downloadItem: DownloadItemProps | undefined;
  downloads: DownloadsDto | undefined;
  generateDownload: (file: string) => Promise<void>;
  verifyDownload: (hash: string) => Promise<DownloadItemProps>;
  download: () => Promise<void>;
}

interface ContentProviderProps {
  children: ReactNode;
}

const ContentContext = createContext<ContentContextProps | undefined>(undefined);

export const ContentProvider = ({ children }: ContentProviderProps) => {
  const { sendNotification } = useNotification();

  const [fetched, setFetched] = useState<boolean>(false);
  const [downloading, setDownloading] = useState<boolean>(false);
  const [downloads, setDownloads] = useState<DownloadsDto | undefined>();
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadItem, setDownloadItem] = useState<DownloadItemProps | undefined>(undefined);

  const download = async () => {
    if (downloading) {
      return;
    }
    setDownloading(true);
    setDownloadProgress(0);

    const downloadUrl = `${baseUrl}/download`;

    const response = await fetch(downloadUrl);

    if (!response.ok || !response.body) {
      let title = "";
      let label = "";
      let type = "" as NotificationType;
      switch (response.status) {
        case 401:
          title = "Download Not Verified";
          label =
            "Your download has not been verified. Please make sure you went through the process correctly";
          type = "error";
          break;
        case 404:
          title = "File Not Found";
          label = "The file you are trying to download does not exist on our server";
          type = "error";
          break;
        default:
          title = "Error While Downloading";
          label = "Please report this issue to us on our discord";
          type = "error";
          break;
      }

      sendNotification({
        title,
        label,
        type,
      });
      return;
    }

    const contentLength = response.headers.get("Content-Length");
    const total = contentLength ? parseInt(contentLength, 10) : NaN;

    const reader = response.body.getReader();
    const chunks: Uint8Array[] = [];
    let loaded = 0;

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

    setDownloadProgress(100);
    setDownloading(false);
  };

  const fetchDownloads = async () => {
    const { data, error } = await $api.GET("/content/downloads");
    setFetched(true);

    if (error) {
      console.log(error);
      sendNotification({
        title: "Failed Fetching",
        label: "Could not fetch downloads from our server",
        type: "error",
      });
      return;
    }

    setDownloads(data as unknown as DownloadsDto);
  };

  const generateDownload = async (file: string) => {
    const { error, response } = await $api.POST("/download/generate", {
      params: {
        query: {
          file,
        },
      },
    });

    if (error) {
      let title = "";
      let label = "";
      let type = "" as NotificationType;
      switch (response.status) {
        case 404:
          title = "File Not Found";
          label = "The file you are trying to download does not exist on our server";
          type = "error";
          break;
        default:
          title = "Error While Downloading";
          label = "Please report this issue to us on our discord";
          type = "error";
          break;
      }

      sendNotification({
        title,
        label,
        type,
      });
      throw Error(error);
    }
  };

  const verifyDownload = async (hash: string): Promise<DownloadItemProps> => {
    const { data, error, response } = await $api.POST("/download/verify", {
      params: {
        query: {
          hash,
        },
      },
    });

    if (error) {
      let title = "";
      let label = "";
      let type = "" as NotificationType;
      switch (response.status) {
        case 400:
          title = "Bad Hash";
          label = "Provided hash in the link is incorrect";
          type = "error";
          break;
        case 404:
          title = "Download Not Found";
          label = "Record of your download does not exist";
          type = "error";
          break;
        case 502:
          title = "Linkvertise Error";
          label = "The hash is invalid. Please go through the download process again.";
          type = "error";
          break;
        case 503:
          title = "Linkvertise Error";
          label = "Currently Linkvertise service is unavailable";
          type = "error";
          break;
        default:
          title = "Error While Downloading";
          label = "Please report this issue to us on our discord.";
          type = "error";
          break;
      }

      sendNotification({
        title,
        label,
        type,
      });
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
