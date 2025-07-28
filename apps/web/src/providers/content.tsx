import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { NotificationType, useNotification } from "~/providers/notification";
import { $api } from "~/services/api-client";
import { baseUrl } from "~/utils/url";
import { VerificationException } from "~/exception/verification-exception";
import { DownloadsDto, DownloadsItemDto } from "~/lib/api";

interface ContentContextProps {
  fetched: boolean;
  downloading: boolean;
  downloadProgress: number;
  downloadItem: DownloadsItemDto | undefined;
  downloads: DownloadsDto | undefined;
  generateDownload: (file: string) => Promise<void>;
  verifyDownload: (hash: string, code: string) => Promise<DownloadsItemDto>;
  download: (code?: string) => Promise<void>;
  openLinkvertise: () => void;
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
  const [downloadItem, setDownloadItem] = useState<DownloadsItemDto | undefined>(undefined);

  const download = async () => {
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
      setDownloading(false);
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
          title = "Error While Generating";
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

  const verifyDownload = async (hash: string, code: string): Promise<DownloadsItemDto> => {
    const { data, error, response } = await $api.POST("/download/verify", {
      params: {
        query: {
          hash,
          code,
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
        case 401:
          title = "Non-existent Voucher";
          label = "Provided voucher does not exist";
          type = "error";
          break;
        case 403:
          title = "Bad Voucher Level";
          label = "This voucher allows you to download only better bedrock content";
          type = "error";
          break;
        case 404:
          title = "Download Not Found";
          label = "Record of your download does not exist";
          type = "error";
          break;
        case 410:
          title = "Invalid Voucher";
          label = "The voucher has either expired or already been used.";
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
          title = "Error While Verifying";
          label = "Please report this issue to us on our discord.";
          type = "error";
          break;
      }

      sendNotification({
        title,
        label,
        type,
      });
      throw new VerificationException(error, response.status);
    }

    const downloadItem = data as unknown as DownloadsItemDto;
    setDownloadItem(downloadItem);
    // setDownloadProgress(0);
    return downloadItem;
  };

  const openLinkvertise = () => {
    const currentUrl = new URL(window.location.origin);
    const segments = currentUrl.pathname.split("/").filter(Boolean);
    segments.push("fetch");
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
