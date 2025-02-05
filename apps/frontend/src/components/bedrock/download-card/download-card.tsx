import React, { useState, useEffect } from "react";
import { Label } from "../label/label";
import { BedrockText } from "../text/bedrock-text";
import styles from "./download-card.module.css";
import defaultImage from "../../../assets/images/example_head.png";

interface DownloadCardProp {
  title?: string;
  description?: string;
  width?: string;
  height?: string;
  iconPath?: string;
  downloadSize?: string;
  textureType?: "green" | "white";
}

const DownloadCard: React.FC<DownloadCardProp> = ({
  title,
  description,
  width,
  height,
  iconPath,
  downloadSize,
  textureType,
}) => {
  const [imageSrc, setImageSrc] = useState(defaultImage);

  //todo: something is wrong right there... if iconPath is passed, defaultImage is still displayed - fix this
  useEffect(() => {
    if (iconPath) {
      import(`${iconPath}`)
        .then((image) => setImageSrc(image.default))
        .catch(() => setImageSrc(defaultImage));
    }
  }, [iconPath]);

  return (
    <div className={styles.download_card_outline}>
      <Label height={height ?? "auto"} width={width ?? "100%"} type={textureType}>
        <div className={styles.download_card_content}>
          <div className={styles.download_card_image}>
            <img alt="" src={imageSrc} />
          </div>
          <div className={styles.download_card_description}>
            <div className={styles.download_card_title}>
              <BedrockText
                text={title ?? ""}
                type={"h1"}
                font="MinecraftTen"
                strong
              />
              <BedrockText
                text={downloadSize ?? ""}
                type={"h1"}
                font="MinecraftTen"
                strong
              />
            </div>
            <BedrockText
              text={description ?? ""}
              type={"p"}
            />
          </div>
        </div>
      </Label>
    </div>
  );
};

export default DownloadCard;