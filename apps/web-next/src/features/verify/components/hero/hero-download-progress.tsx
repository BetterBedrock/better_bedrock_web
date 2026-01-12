"use client";

import { Banner } from "@/components/banner";
import { LoadingBar } from "@/components/loading-bar";
import { useDownload } from "@/providers/download";

import styles from "./hero.module.scss";

export const HeroDownloadProgress = () => {
  const { downloadProgress } = useDownload();
  return downloadProgress == 100 ? (
    <Banner message="File sent successfully! Please confirm the incoming transfer on your device." type="important" />
  ) : (
    <LoadingBar className={styles.bar} percentage={downloadProgress} />
  );
};
