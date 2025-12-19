"use client";

import { useDownload } from "@/providers/download";
import { BedrockText } from "@/components/bedrock-text";

import styles from "./hero.module.scss";

interface HeroRedownloadMessageProps {
  voucher?: string;
}

export const HeroRedownloadMessage = ({
  voucher,
}: HeroRedownloadMessageProps) => {
  const { download } = useDownload();

  return (
    <BedrockText
      type="p"
      color="white"
      extraClassName={styles.label}
      text="Download did not start? Click here!"
      onClick={() => download(voucher)}
    />
  );
};
