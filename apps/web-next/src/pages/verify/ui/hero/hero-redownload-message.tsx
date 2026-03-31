"use client";

import { useEffect, useState } from "react";
import { useDownload } from "@/pages/verify/model/download";
import { BedrockText } from "@/shared/ui/bedrock-text";
import clsx from "clsx";

import styles from "./hero.module.scss";
import { baseUrl } from "@/shared/lib/utils";
import { Link } from "@/shared/ui/link";

export const HeroRedownloadMessage = () => {
  const { downloadProgress } = useDownload();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (downloadProgress === 100) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
    }
  }, [downloadProgress]);

  return (
    <Link link={baseUrl + "/download"} className={styles.link}>
      <BedrockText
        type="p"
        color="white"
        extraClassName={clsx(styles.redownload, visible && styles.visible)}
        text="Problems with the download? Click to retry!"
      />
    </Link>
  );
};
