import React from "react";
import { BedrockText } from "../text/bedrock-text";
import styles from "./download-card.module.css";
import { Button, ButtonType } from "../button";

interface DownloadCardProp {
  title?: string;
  description?: string;
  iconPath?: string;
  downloadSize?: string;
  buttonType?: ButtonType;
  playSound?: boolean;
  lockClicking?: boolean;
  height?: string;
  onClick?: () => Promise<void>;
}

const DownloadCard: React.FC<DownloadCardProp> = ({
  title,
  description,
  iconPath,
  downloadSize,
  buttonType = "alwaysWhite",
  playSound = true,
  lockClicking,
  height = "auto",
  onClick,
}) => {

  return (
    <Button
      text=""
      width={"100%"}
      height={height}
      type={buttonType}
      lockClicking={lockClicking}
      playSound={playSound}
      onClick={onClick}>

      <div className={styles.download_card_content}>
        <img alt="" src={iconPath} style={{imageRendering: "pixelated"}} />
        <div className={styles.download_card_description}>
          <div className={styles.download_card_title}>
            <BedrockText
              text={title ?? ""}
              type={"h2"}
              font="MinecraftTen"
              textAlign="left"
              style={{ padding: "0 0.5rem 0 0" }}
            />
            <BedrockText
              text={downloadSize ?? ""}
              type={"h2"}
              font="MinecraftTen"
              textAlign="left"
            />
          </div>
          <BedrockText
            text={description ?? ""}
            type={"p"}
            textAlign="left"
          />
        </div>
      </div>

    </Button>
  );
};

export default DownloadCard;