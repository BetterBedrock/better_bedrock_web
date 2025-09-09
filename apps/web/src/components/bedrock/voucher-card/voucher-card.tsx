import React from "react";
import { BedrockText } from "../bedrock-text/bedrock-text";
import { styles } from ".";
import { VoucherDto } from "~/lib/api";
import { Button } from "~/components/bedrock/button";

interface VoucherCardProps {
  voucher: VoucherDto;
  playSound?: boolean;
  lockClicking?: boolean;
  height?: string;
  onClick?: () => Promise<void>;
}

export const VoucherCard = ({
  voucher,
  playSound = true,
  lockClicking,
  height = "auto",
  onClick,
}: VoucherCardProps) => {
  return (
    <Button
      width="100%"
      height={height}
      type="white"
      lockClicking={lockClicking}
      playSound={playSound}
      onClick={onClick}
    >
      <div className={styles.content}>
        <BedrockText
          text={voucher.code}
          type="h1"
          font="Minecraft"
          textAlign="left"
          extraClassName={styles.price}
        />
        <div className={styles.description}>
          <strong>
            <BedrockText text={voucher.email} type="p" textAlign="left" />
          </strong>
          <BedrockText text={`Usage - ${voucher.downloadCount} / ${voucher.maxDownloads}`} type="p2" textAlign="left" />
        </div>
      </div>
    </Button>
  );
};
