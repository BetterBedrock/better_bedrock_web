"use client";

import { Button, ButtonType } from "@/shared/ui/button";
import { BedrockText } from "@/shared/ui/bedrock-text";

import { styles } from ".";

interface DownloadMethodCardProp {
  label?: string;
  title?: string;
  price?: string;
  buttonType?: ButtonType;
  playSound?: boolean;
  height?: string;
  onClick?: () => Promise<void>;
  color?: string;
}

export const DownloadMethodCard = ({
  title,
  price,
  buttonType = "white",
  color = "black",
  height = "auto",
  onClick,
}: DownloadMethodCardProp) => (
  <Button
    width="100%"
    height={height}
    type={buttonType}
    onClick={onClick}
  >
    <div className={styles.content}>
      <BedrockText
        text={price ?? ""}
        type="h1"
        font="Minecraft"
        textAlign="left"
        extraClassName={styles.price}
        color={color}
      />
      <div className={styles.description}>
        <BedrockText
          text={title ?? ""}
          type="p"
          textAlign="left"
          color={color}
        />
      </div>
    </div>
  </Button>
);
