"use client";

import { useEffect, useState } from "react";
import { useDownload } from "@/pages/verify/model/download";
import { BedrockText } from "@/shared/ui/bedrock-text";
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
  const [delayed, setDelayed] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setDelayed(true), 4750);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (downloadProgress === 100) {
      setVisible(true);
    }
  }, [downloadProgress]);

  const handleRetry = () => {
    setVisible(false);
    setDelayed(false);
    setAnimationKey((prev) => prev + 1);
    download(voucher);
  };

  const htmlElement = (
    <BedrockText
      key={animationKey}
      type="p"
      color="white"
      extraClassName={clsx(styles.retryLabel, styles.redownload)}
      text="Problems with the download? Click to retry!"
      onClick={handleRetry}
    />
  );

  return <>{(visible || delayed) && htmlElement}</>;
};
