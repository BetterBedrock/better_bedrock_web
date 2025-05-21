import React from "react";
import { BedrockText } from "../bedrock-text/bedrock-text";

import styles from "./grid-download-card.module.css";
import { Button } from "../button/button";
import { ButtonSeparator } from "../button-separator";

interface GridDownloadCardProps {
  title?: string,
  downloadSize?: string;
  description?: string
  thumbnailImageUrl?: string,
}

export const GridDownloadCard: React.FC<GridDownloadCardProps> = ({ title, downloadSize, description, thumbnailImageUrl }) => {
  return (
    <div className={styles.container}>
      <div className={styles.thumbnailWrapper}>
        {thumbnailImageUrl && <img src={thumbnailImageUrl} alt="" />}
      </div>
      <div className={styles.texts}>
        <div className={styles.cardTitle}>
          <BedrockText
            text={title ?? ""}
            type={"h2"}
            font="MinecraftTen"
            textAlign="left"
            color="white"
            style={{ padding: "0 0.5rem 0 0" }}
          />
          <BedrockText
            text={downloadSize ?? "4.2MB"}
            type={"h2"}
            font="MinecraftTen"
            color="white"
            textAlign="left"
          />
        </div>
        <BedrockText
          text={description ?? ""}
          type={"p"}
          textAlign="left"
          color="white"
        />
      </div>
      <GridDownloadCardDivider />
      <ButtonSeparator
        style={{ padding: "5px", width: "100%" }}>
        <Button
          // style={{ margin: "5px" }}
          text="Download"
          width={"100%"}
          height={"auto"}
          type="alwaysGreen"
        />
        <Button
          // style={{ margin: "5px" }}
          text="Preview"
          width={"100%"}
          height={"auto"}
          type="alwaysWhite"
        />
      </ButtonSeparator>
    </div>
  );
};

export const GridDownloadCardDivider = () => {
  return (
    <>
      <div style={{ backgroundColor: "rgb(31,31,32)", width: "100%", height: "2.5px" }}></div>
      <div style={{ backgroundColor: "rgb(60,61,62)", width: "100%", height: "2.5px" }}></div>
    </>
  );
};