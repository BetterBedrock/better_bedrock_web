"use server";

import { verifyDownload } from "@/lib/downloads/verify-download";
import { cookies } from "next/headers";
import { VoucherDto, DetailedProjectDto } from "@/lib/api";
import { DownloadProvider } from "@/providers/download";
import { HeroHeader } from "./hero-header";
import { HeroCreatorBanner } from "./hero-creator-banner";
import { HeroDownloadProgress } from "./hero-download-progress";
import { HeroRedownloadMessage } from "./hero-redownload-message";

import styles from "./hero.module.scss";
import { Card, CardBody, CardDivider } from "@/components/card";

interface HeroProps {
  hash?: string;
}

export const Hero = async ({ hash }: HeroProps) => {
  const cookieStore = await cookies();
  const voucher = cookieStore.get("voucher")?.value;

  const downloadItem = await verifyDownload(
    hash ?? undefined,
    (JSON.parse(voucher ?? "{}") as VoucherDto)?.code
  ) as DetailedProjectDto; //The type assertion 'as DetailedProjectDto' is unsafe. If 'verifyDownload' returns a different type or null, this will cause runtime errors. Add proper type guards or handle the case where the result may not be a DetailedProjectDto.

  return (
    <Card fullWidth>
      <CardBody>
        <HeroHeader project={downloadItem} />
      </CardBody>
      <CardDivider />
      <CardBody>
        <div className={styles.content}>
          <DownloadProvider downloadItem={downloadItem}>
            <HeroCreatorBanner creatorName={downloadItem.user?.name} />
            <HeroDownloadProgress />
            <HeroRedownloadMessage />
          </DownloadProvider>
        </div>
      </CardBody>
    </Card>
  );
};
