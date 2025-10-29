import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { VoucherDto } from "~/lib/api";
import { AxiosError } from "axios";
import { Routes } from "~/utils/routes";
import { useDownload } from "~/providers/download";

interface UseStartDownloadProps {
  hash: string | null;
}

export const useStartDownload = ({ hash }: UseStartDownloadProps) => {
  const [cookie, _, removeCookie] = useCookies(["voucher"]);
  const { verifyDownload, download, downloadProgress, downloadItem, downloading } = useDownload();
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    //Timeout required because linkvertise servers are too slow /shrug
    const timer = setTimeout(async () => {
      try {
        await verifyDownload(hash ?? undefined, (cookie.voucher as VoucherDto)?.code);
        setVerified(true);
      } catch (err) {
        if (err instanceof AxiosError) {
          if (err.status === 410 || err.status === 401 || err.status === 403) {
            removeCookie("voucher");
            navigate(Routes.HOME);
          }
        }

        console.log(err);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!verified) {
      return;
    }

    if (downloadItem && !downloading) {
      download(cookie.voucher);
    }
  }, [downloadItem, verified]);

  return { downloadItem, downloadProgress };
};
