import { verifyDownload } from "@/entities/download";
import { cookies } from "next/headers";
import { DownloadProvider } from "@/pages/verify/model/download";
import { HeroHeader } from "./hero-header";
import { HeroDownloadProgress } from "./hero-download-progress";
import { HeroRedownloadMessage } from "./hero-redownload-message";

import styles from "./hero.module.scss";
import { redirect } from "next/navigation";
import { Routes } from "@/shared/lib/utils";
import { fetchUserById } from "@/entities/user";
import { Card, CardBody, CardDivider } from "@/shared/ui/card";

interface HeroProps {
  hash?: string;
}

export const Hero = async ({ hash }: HeroProps) => {
  const cookieStore = await cookies();
  const voucher = cookieStore.get("voucher")?.value;

  const downloadItem = await verifyDownload(hash ?? undefined, voucher);
  const author = await fetchUserById(downloadItem?.userId ?? "");

  if (!downloadItem || !author) {
    redirect(Routes.DOWNLOADS_MAIN);
  }

  return (
    <Card fullWidth>
      <CardBody>
        <HeroHeader project={downloadItem} creator={author} />
      </CardBody>
      <CardDivider />
      <CardBody>
        <div className={styles.content}>
          {/* <HeroCreatorBanner creatorName={"TODO"} /> */}
          <DownloadProvider downloadItem={downloadItem}>
            <HeroDownloadProgress />
            <HeroRedownloadMessage />
          </DownloadProvider>
        </div>
      </CardBody>
    </Card>
  );
};
