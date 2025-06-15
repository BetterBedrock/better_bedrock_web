import React from "react";
import { BedrockText } from "../bedrock-text/bedrock-text";
import styles from "./download-method-card.module.css";
import { Button, ButtonType } from "../button";

interface DownloadMethodCardProp {
  label?: string;
  title?: string;
  price?: string;
  buttonType?: ButtonType;
  playSound?: boolean;
  lockClicking?: boolean;
  height?: string;
  onClick?: () => Promise<void>;
}

export const DownloadMethodCard = ({
  label,
  title,
  price,
  buttonType = "alwaysWhite",
  playSound = true,
  lockClicking,
  height = "auto",
  onClick,
}: DownloadMethodCardProp) => {
  return (
    <Button
      text=""
      width={"100%"}
      height={height}
      type={buttonType}
      lockClicking={lockClicking}
      playSound={playSound}
      onClick={onClick}
    >
      <div className={styles.download_card_content}>
        <BedrockText
          text={price ?? ""}
          type={"h1"}
          font="MinecraftTen"
          textAlign="left"
          extraClassName={styles.price}
        />
        <div className={styles.download_card_description}>
          <strong>
            <BedrockText text={title ?? ""} type={"p"} textAlign="left" />
          </strong>
          <BedrockText text={label ?? ""} type={"p2"} textAlign="left" />
        </div>
      </div>
    </Button>
  );
};
