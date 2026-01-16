import { verifyDownload } from "@/lib/downloads/verify-download";
import { cookies } from "next/headers";
import { DownloadProvider } from "@/providers/download";
import { HeroHeader } from "./hero-header";
import { HeroCreatorBanner } from "./hero-creator-banner";
import { HeroDownloadProgress } from "./hero-download-progress";
import { HeroRedownloadMessage } from "./hero-redownload-message";

import styles from "./hero.module.scss";
import { redirect } from "next/navigation";
import { Routes } from "@/utils/routes";

interface HeroProps {
  hash?: string;
}

export const Hero = async ({ hash }: HeroProps) => {
  const cookieStore = await cookies();
  const voucher = cookieStore.get("voucher")?.value;

  const downloadItem = await verifyDownload(hash ?? undefined, voucher);

  if (!downloadItem) {
    redirect(Routes.DOWNLOADS_MAIN);
  }

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
