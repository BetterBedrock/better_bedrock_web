import React from "react";
import { BedrockText } from "../bedrock-text/bedrock-text";

import { styles } from ".";
import tutorialThumbnail from "~/assets/images/tutorial-thumbnail-placeholder.png";

interface GridCardProps {
  title?: string;
  description?: string;
  link?: string;
  index?: string | number;
  useCustomThumbnail?: boolean;
  customThumbnailImageUrl?: string;
  tags?: TagsTypes[]
}

export type TagsTypes =  "All Devices" | "Mobile" | "PC" | "Console" | "PC/Console" | "Featured" | "Deprecated";

export const GridCard: React.FC<GridCardProps> = ({
  title,
  description,
  link = "https://www.youtube.com",
  index,
  useCustomThumbnail = false,
  customThumbnailImageUrl,
  tags
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
                      {tags.map(tag => {
                        let textColor, bgColor

                        switch (tag) {
                          case "Featured":
                            textColor = "black";
                            bgColor = "rgb(255, 232, 102)"
                            break;
                          case "Deprecated":
                            textColor = "black";
                            // bgColor = "rgb(217, 54, 54)"
                            bgColor = "rgb(255, 63, 63)"
                            break;
                          default:
                            textColor = "black";
                            // bgColor = "rgb(49, 50, 51)";
                            bgColor = "rgb(140, 179, 255)"
                        }

                        return (
                          < BedrockText
                            text={tag}
                            type={"p"}
                            textAlign="left"
                            color={textColor}
                            style={{
                              backgroundColor: bgColor
                            }}
                          />
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>)}
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
