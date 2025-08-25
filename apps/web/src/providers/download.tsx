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
  openLinkvertise: (linkvertiseId: string) => void;
  getLinkvertiseUrl: (linkvertiseId: string) => string;
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
      await downloadApi.downloadControllerVerify(hash, code);
    } catch (err) {
      throwError(err, "Failed to verify download");
      throw err;
    }
  };

  const openLinkvertise = (linkvertiseId: string) => {
    const currentUrl = new URL(window.location.origin);
    const segments = currentUrl.pathname.split("/").filter(Boolean);
    segments.push("fetch");
    currentUrl.pathname = "/" + segments.join("/");

    const baseUrl = `https://link-to.net/${linkvertiseId}/${Math.random() * 1000}/dynamic/`;

    const encodedUri = currentUrl.toString();
    const base64Encoded = btoa(encodedUri);

    const href = `${baseUrl}?r=${base64Encoded}`;
    const finalUri = new URL(href);

    window.open(finalUri.toString(), "_blank");
  };

  const getLinkvertiseUrl = (linkvertiseId: string): string => {
    const currentUrl = new URL(window.location.origin);
    const segments = currentUrl.pathname.split("/").filter(Boolean);
    segments.push("fetch");
    currentUrl.pathname = "/" + segments.join("/");

    const baseUrl = `https://link-to.net/${linkvertiseId}/${Math.random() * 1000}/dynamic/`;

    const encodedUri = currentUrl.toString();
    const base64Encoded = btoa(encodedUri);

    const href = `${baseUrl}?r=${base64Encoded}`;
    return new URL(href).toString();
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
