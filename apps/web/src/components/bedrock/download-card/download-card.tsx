import React, { useState, useEffect } from "react";
import { BedrockText } from "../text/bedrock-text";
import styles from "./download-card.module.css";
import defaultImage from "../../../assets/images/example_head.png";
import { Button, ButtonType } from "../button";

interface DownloadCardProp {
  title?: string;
  description?: string;
  iconPath?: string;
  downloadSize?: string;
  buttonType?: ButtonType;
  playSound?: boolean;
  lockClicking?: boolean;
  height?: string
}

const DownloadCard: React.FC<DownloadCardProp> = ({
  title,
  description,
  iconPath,
  downloadSize,
  buttonType = "alwaysWhite",
  playSound = true,
  lockClicking,
  height = "auto"
}) => {
  const [imageSrc, setImageSrc] = useState(defaultImage);

  useEffect(() => {
    if (iconPath) {
      import(`../../../${iconPath}`)
        .then((image) => setImageSrc(image.default))
        .catch(() => setImageSrc(defaultImage));
    }
  }, [iconPath]);

  return (
    <Button
      text=""
      width={"100%"}
      height={height}
      type={buttonType}
      lockClicking={lockClicking}
      playSound={playSound}>

      <div className={styles.download_card_content}>
        <img alt="" src={imageSrc} style={{imageRendering: "pixelated"}} />
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