"use client";

import { useEffect, useState } from "react";
import { useDownload } from "@/pages/verify/model/download";
import { BedrockText } from "@/shared/ui/bedrock-text";
import clsx from "clsx";

import styles from "./hero.module.scss";

export const HeroRedownloadMessage = () => {
  const { download, downloadProgress } = useDownload();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (downloadProgress === 100) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
    }
  }, [downloadProgress]);

  const handleRetry = () => {
    setVisible(false);
    download();
  };

  return (
    <BedrockText
      type="p"
      color="white"
      extraClassName={clsx(styles.redownload, visible && styles.visible)}
      text="Problems with the download? Click to retry!"
      onClick={handleRetry}
    />
  );
};
