import React from "react";
import { BedrockText } from "../bedrock-text/bedrock-text";
import styles from "./download-card.module.css";
import { ButtonType, Button } from "~/components/bedrock/button";

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
  tags?: string[];
  titleColor?: string;
}

const DownloadCard: React.FC<DownloadCardProp> = ({
  title,
  description,
  iconPath,
  downloadSize,
  buttonType = "white",
  playSound = true,
  lockClicking,
  height = "auto",
  onClick,
  tags,
  titleColor,
}) => {
  return (
    <Button
      width="100%"
      height={height}
      type={buttonType as ButtonType}
      lockClicking={lockClicking}
      playSound={playSound}
      onClick={onClick}
    >
      <div className={styles.download_card_content}>
        <img alt="" src={iconPath} style={{ imageRendering: "pixelated" }} />
        <div className={styles.download_card_description}>
          <div className={styles.download_card_title}>
            <BedrockText
              color={titleColor ? titleColor : buttonType === "white" ? "black" : "white"}
              text={title ?? ""}
              type={"h2"}
              font="MinecraftTen"
              textAlign="left"
              style={{ padding: "0 0.5rem 0 0" }}
            />
            <BedrockText
              text={downloadSize ?? ""}
              type={"h3"}
              font="MinecraftTen"
              textAlign="left"
              color={buttonType === "white" ? "black" : "white"}
            />
          </div>
          <BedrockText
            text={description ?? ""}
            type="p"
            textAlign="left"
            color={buttonType === "white" ? "black" : "white"}
          />
          {tags && tags.length > 0 && (
            <div className={styles.TagsContainer}>
              {tags.map((tag) => (
                <p key={tag} className={styles.Tag}>
                  {tag}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </Button>
  );
};

export default DownloadCard;
