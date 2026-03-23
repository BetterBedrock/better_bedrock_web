"use client";

import { useEffect, useState } from "react";
import { useDownload } from "@/pages/verify/model/download";
import { BedrockText } from "@/shared/ui/bedrock-text";
import clsx from "clsx";

import styles from "./hero.module.scss";
import { baseUrl } from "@/shared/lib/utils";

export const HeroRedownloadMessage = () => {
  const { downloadProgress } = useDownload();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (downloadProgress === 100) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
    }
  }, [downloadProgress]);

  const handleRetry = () => {
    window.open(baseUrl + "/download", "_self");
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
