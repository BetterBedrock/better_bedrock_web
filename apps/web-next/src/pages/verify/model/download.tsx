"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNotification } from "@/shared/model/notification";
import { baseUrl } from "@/shared/lib/url";
import { ProjectDto } from "@/shared/api/openapi";

interface DownloadContextProps {
  downloading: boolean;
  downloadProgress: number;
  downloadItem: ProjectDto | undefined;
  download: (code?: string) => Promise<void>;
}

interface DownloadProviderProps {
  children: ReactNode;
  downloadItem: ProjectDto;
}

const DownloadContext = createContext<DownloadContextProps | undefined>(
  undefined,
);

export const DownloadProvider = ({
  children,
  downloadItem,
}: DownloadProviderProps) => {
  const { throwError } = useNotification();

  const [downloading, setDownloading] = useState<boolean>(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

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
    const contentType =
      response.headers.get("Content-Type") || "application/octet-stream";

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
    const filenameMatch = /filename\*=UTF-8''([^;]+)|filename="([^"]+)"/.exec(
      disposition,
    );
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

  useEffect(() => {
    if (downloadItem && !downloading) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      download();
    }
  }, [downloadItem]);

  return (
    <DownloadContext.Provider
      value={{
        downloading,
        downloadProgress,
        downloadItem,
        download,
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
