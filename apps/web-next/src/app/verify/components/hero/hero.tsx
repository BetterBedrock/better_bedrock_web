"use server";

import { verifyDownload } from "@/_lib/downloads/verify-download";
import {
  HeroDownloadProgress,
  HeroRedownloadMessage,
  HeroHeader,
  styles,
} from ".";
import { cookies } from "next/headers";
import { VoucherDto } from "@/_lib/api";
import { DownloadProvider } from "@/_providers/download";

interface HeroProps {
  hash?: string;
}

export const Hero = async ({ hash }: HeroProps) => {
  const cookieStore = await cookies();
  const voucher = cookieStore.get("voucher")?.value;

  const downloadItem = await verifyDownload(
    hash ?? undefined,
    (JSON.parse(voucher ?? "{}") as VoucherDto)?.code
  );

  return (
    <div className={styles.hero}>
      <HeroHeader project={downloadItem} />
      <DownloadProvider downloadItem={downloadItem}>
        <HeroDownloadProgress />
        <HeroRedownloadMessage />
      </DownloadProvider>
    </div>
  );
};
