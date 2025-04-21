import React from "react";
import { BedrockText } from "../text/bedrock-text";

import styles from "./grid-card.module.css";
import tutorialThumbnail from "~/assets/images/tutorial_thumbnails/thumbnail-placeholder.png";

interface GridCardProps {
  title?: string,
  description?: string
  link?: string,
  index?: string | number,
}

export const GridCard: React.FC<GridCardProps> = ({ title, description, link = "https://www.youtube.com", index }) => {
  return (
    <div className={styles.container}>
      <a href={link} rel="noopener noreferrer" target="_blank">
        <div>
          <img src={tutorialThumbnail} alt="" />
          {index && (
            <div className={styles.imgWrapper}>
              < BedrockText
                text={(index && `#${index}`) || ""}
                type={"h1"}
                font="MinecraftTen"
                textAlign="left"
                color="white"
                style={{ position: "absolute" }}
              />
            </div>)}
        </div>
      </a>
      <div className={styles.texts}>
        < BedrockText
          text={title || ""}
          type={"h2"}
          font="MinecraftTen"
          textAlign="left"
          color="white"
        />
        <BedrockText
          text={description ?? ""}
          type={"p"}
          textAlign="left"
          color="white"
        />
      </div>
    </div>
  );
};
