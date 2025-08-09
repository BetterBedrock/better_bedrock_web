import React from "react";
import { BedrockText } from "../bedrock-text/bedrock-text";

import { styles } from ".";
import tutorialThumbnail from "~/assets/images/tutorial-thumbnail-placeholder.png";
import { tagData } from "~/pages/information";

interface GridCardProps {
  title?: string;
  description?: string;
  link?: string;
  index?: string | number;
  useCustomThumbnail?: boolean;
  customThumbnailImageUrl?: string;
  tags?: string[];
}

export type TagsTypes =
  | "All Devices"
  | "Mobile"
  | "PC"
  | "Console"
  | "PC/Console"
  | "Feavideostured"
  | "Deprecated";

export const GridCard: React.FC<GridCardProps> = ({
  title,
  description,
  link = "https://www.youtube.com",
  index,
  useCustomThumbnail = false,
  customThumbnailImageUrl,
  tags,
}) => {
  return (
    <div className={styles.container}>
      {useCustomThumbnail && (
        <div className={styles.thumbnailWrapper}>
          {customThumbnailImageUrl && <img src={customThumbnailImageUrl} alt="" />}
        </div>
      )}
      {!useCustomThumbnail && (
        <a href={link} rel="noopener noreferrer" target="_blank">
          <div>
            <img src={tutorialThumbnail} alt="" />
            {index && (
              <div className={styles.imgWrapper}>
                <BedrockText
                  text={(index && `#${index}`) || ""}
                  type={"h1"}
                  font="MinecraftTen"
                  textAlign="left"
                  color="white"
                  style={{ position: "absolute" }}
                />
                {tags && (
                  <div className={styles.tagsWrapper}>
                    <div className={styles.tagsContainer}>
                      {tags.map((tag) => {
                        const selectedTag = tagData.find((t) => t.id === tag);
                        if (!selectedTag) return <></>;

                        return (
                          <BedrockText
                            text={selectedTag.name}
                            type={"p"}
                            textAlign="left"
                            style={{ backgroundColor: selectedTag.color }}
                            color="#000"
                          />
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </a>
      )}
      <div className={styles.texts}>
        <BedrockText
          text={title || ""}
          type={"h2"}
          font="MinecraftTen"
          textAlign="left"
          color="white"
        />
        <BedrockText text={description ?? ""} type={"p"} textAlign="left" color="white" />
      </div>
    </div>
  );
};
