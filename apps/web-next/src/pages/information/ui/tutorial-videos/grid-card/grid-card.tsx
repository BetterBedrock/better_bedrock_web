import { BedrockText } from "@/shared/ui/bedrock-text";

import tutorialThumbnail from "@/public/images/tutorial-thumbnail-placeholder.png";
import { tagData } from "@/pages/information/model/information-data";

import { styles } from ".";
import Image from "next/image";

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

export const GridCard = ({
  title,
  description,
  link = "https://www.youtube.com",
  index,
  useCustomThumbnail = false,
  customThumbnailImageUrl,
  tags,
}: GridCardProps) => (
  <div className={styles.container}>
    {useCustomThumbnail && (
      <div className={styles.thumbnailWrapper}>
        {customThumbnailImageUrl && (
          <Image
            width={426}
            height={240}
            className={styles.image}
            src={customThumbnailImageUrl}
            alt="Grid Card Custom Thumbnail"
          />
        )}
      </div>
    )}
    {!useCustomThumbnail && (
      <a href={link} rel="noopener noreferrer" target="_blank">
        <div>
          <Image
            width={426}
            height={240}
            src={tutorialThumbnail.src}
            className={styles.image}
            alt="Grid Card Custom Thumbnail"
          />
          {index && (
            <div className={styles.imgWrapper}>
              <BedrockText
                text={(index && `#${index}`) || ""}
                type="h4"
                font="Minecraft"
                textAlign="left"
                color="white"
                extraClassName={styles.author}
              />
              {tags && (
                <div className={styles.tagsWrapper}>
                  <div className={styles.tagsContainer}>
                    {tags.map((tag, index) => {
                      const selectedTag = tagData.find((t) => t.id === tag);
                      if (!selectedTag) return;

                      return (
                        <BedrockText
                          key={index}
                          text={selectedTag.name}
                          type="p"
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
    <div className={styles.descContainer}>
      <div className={styles.desc}>
        <BedrockText
          text={title || ""}
          type="h3"
          font="Minecraft"
          textAlign="left"
          color="white"
        />
        <BedrockText
          text={description ?? ""}
          type="p"
          textAlign="left"
          color="white"
        />
      </div>
    </div>
  </div>
);
