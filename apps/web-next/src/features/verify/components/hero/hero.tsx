"use server";

import { verifyDownload } from "@/lib/downloads/verify-download";
import { cookies } from "next/headers";
import { VoucherDto } from "@/lib/api";
import { DownloadProvider } from "@/providers/download";
import { HeroHeader } from "./hero-header";
import { HeroDownloadProgress } from "./hero-download-progress";
import { HeroRedownloadMessage } from "./hero-redownload-message";

import styles from "./hero.module.scss";

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
