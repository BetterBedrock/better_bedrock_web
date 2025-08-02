import React from "react";
import { BedrockText } from "../bedrock-text/bedrock-text";
import styles from "./voucher-card.module.css";
import { VoucherDto } from "~/lib/api";
import { Button } from "~/components/bedrock/button";

interface VoucherCardProps {
  voucher: VoucherDto,
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
      <div className={styles.download_card_content}>
        <BedrockText
          text={voucher.code}
          type="h1"
          font="MinecraftTen"
          textAlign="left"
          extraClassName={styles.price}
        />
        <div className={styles.download_card_description}>
          <strong>
            <BedrockText text={voucher.email} type="p" textAlign="left" />
          </strong>
          <BedrockText text={String(voucher.checkoutId)} type="p2" textAlign="left" />
        </div>
      </div>
    </Button>
  );
};
