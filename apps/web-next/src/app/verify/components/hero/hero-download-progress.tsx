"use client";

import { Banner } from "@/_components/banner";
import { styles } from ".";
import { LoadingBar } from "@/_components/loading-bar";
import { useDownload } from "@/_providers/download";

export const HeroDownloadProgress = () => {
  const { downloadProgress } = useDownload();
  return downloadProgress == 100 ? (
    <Banner message="File received successfully" type="important" />
  ) : (
    <LoadingBar className={styles.bar} percentage={downloadProgress} />
  );
};
