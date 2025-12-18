"use client";

import { Banner } from "@/_components/banner";
import { LoadingBar } from "@/_components/loading-bar";
import { useDownload } from "@/_providers/download";

import styles from "./hero.module.scss";

export const HeroDownloadProgress = () => {
  const { downloadProgress } = useDownload();
  return downloadProgress == 100 ? (
    <Banner message="File received successfully" type="important" />
  ) : (
    <LoadingBar className={styles.bar} percentage={downloadProgress} />
  );
};
