"use client";

import { useEffect, useState } from "react";
import { useDownload } from "@/providers/download";
import { BedrockText } from "@/components/bedrock-text";
import clsx from "clsx";

import styles from "./hero.module.scss";

interface HeroRedownloadMessageProps {
  voucher?: string;
}

export const HeroRedownloadMessage = ({
  voucher,
}: HeroRedownloadMessageProps) => {
  const { download, downloadProgress } = useDownload();
  const [visible, setVisible] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  // Show immediately when download completes (removes animation delay from retry text)
  useEffect(() => {
    if (downloadProgress === 100) {
      setVisible(true);
    }
  }, [downloadProgress]);

  const handleRetry = () => {
    setVisible(false);
    setAnimationKey((prev) => prev + 1); // Reset CSS animation by adding a new key
    download(voucher);
  };

  return (
    <BedrockText
      key={animationKey}
      type="p"
      color="white"
      extraClassName={clsx(styles.label, styles.redownload, visible && styles.visible)}
      text="Problems with the download? Click to retry!"
      onClick={handleRetry}
    />
  );
};
