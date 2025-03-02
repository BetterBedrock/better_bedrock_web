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
}

const DownloadCard: React.FC<DownloadCardProp> = ({
  title,
  description,
  iconPath,
  downloadSize,
  buttonType = "alwaysWhite",
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
      height={"100%"}
      type={buttonType}>

      <div className={styles.download_card_content}>
        <img alt="" src={imageSrc} />
        <div className={styles.download_card_description}>
          <div className={styles.download_card_title}>
            <BedrockText
              text={title ?? ""}
              type={"h2"}
              font="MinecraftTen"
              strong
            />
            <BedrockText
              text={downloadSize ?? ""}
              type={"h2"}
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

    </Button>
  );
};

export default DownloadCard;