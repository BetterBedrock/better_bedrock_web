"use client";

import { verifyDownload } from "@/entities/download";
import { DownloadProvider } from "@/pages/verify/model/download";
import { HeroHeader } from "./hero-header";
import { HeroDownloadProgress } from "./hero-download-progress";
import { HeroRedownloadMessage } from "./hero-redownload-message";

import styles from "./hero.module.scss";
import { redirect } from "next/navigation";
import { Routes } from "@/shared/lib/utils";
import { fetchUserById } from "@/entities/user";
import { Card } from "@/shared/ui/card";
import { useEffect, useState } from "react";
import { ProjectDto, SimpleUserDto } from "@/shared/lib/openapi";
import { CircularProgressIndicator } from "@/shared/ui/circular-progress-indicator";
import { HeroCreatorBanner } from "@/pages/verify/ui/hero/hero-creator-banner";

interface HeroProps {
  hash?: string;
  voucher: string | undefined;
}

export const Hero = ({ hash, voucher }: HeroProps) => {
  const [downloadItem, setDownloadItem] = useState<
    ProjectDto | null | undefined
  >(undefined);
  const [author, setAuthor] = useState<SimpleUserDto | undefined>(undefined);

  useEffect(() => {
    const handleVerifyDownload = async () => {
      const item = await verifyDownload(hash ?? undefined, voucher);
      const creator = await fetchUserById(item?.userId ?? "");

      if (!item || !creator) {
        redirect(Routes.DOWNLOADS_MAIN);
      }

      setAuthor(creator);
      setDownloadItem(item);
    };

    handleVerifyDownload();
  }, [hash]);

  if (downloadItem === undefined || !author) {
    return <CircularProgressIndicator />;
  }

  return (
    <Card fullWidth>
      <Card.Body>
        <HeroHeader project={downloadItem!} creator={author} />
      </Card.Body>
      <Card.Divider />
      <Card.Body>
        <div className={styles.content}>
          {/* <HeroCreatorBanner creatorName={"TODO"} /> */}
          <DownloadProvider downloadItem={downloadItem!}>
            <HeroCreatorBanner creatorName={author.name} />
            <HeroDownloadProgress />
            <HeroRedownloadMessage />
          </DownloadProvider>
        </div>
      </Card.Body>
    </Card>
  );
};
