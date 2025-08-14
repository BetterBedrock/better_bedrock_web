import React from "react";
import { BedrockText } from "../bedrock-text/bedrock-text";
import styles from "./grid-download-card.module.scss";
import clsx from "clsx";
import Steve from "~/assets/images/avatars/Steve.png";
import { Tag } from "~/components/bedrock/tag";
import { Rating } from "~/components/rating";

interface GridDownloadCardProps {
  title?: string;
  downloadSize?: string;
  thumbnail?: string;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  useTopDivider?: boolean;
  tags?: string[];
}

export const GridDownloadCard: React.FC<GridDownloadCardProps> = ({
  title,
  downloadSize,
  description,
  thumbnail,
  actions,
  className,
  // useTopDivider = false,
  tags,
}) => {
  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.header}>
        <img src={Steve} className={styles.avatar} />

        {/* Renders the description, which can now be any React node */}
        <div>
          {description}
          <Rating simple rating={2.5} />
        </div>
      </div>

      {thumbnail && (
        <div className={styles.thumbnailWrapper}>
          <img src={thumbnail} alt={`Thumbnail for ${title}`} className={styles.thumbnail} />
          <div className={styles.details}>
            <div className={styles.cardTitle}>
              <BedrockText
                text={title ?? ""}
                type="h2"
                font="MinecraftTen"
                textAlign="left"
                color="white"
                style={{ padding: "0 0.5rem 0 0" }}
              />
              <BedrockText
                text={downloadSize ?? ""}
                type={"h3"}
                font="MinecraftTen"
                color="white"
                textAlign="left"
                extraClassName={styles.downloadSize}
              />
            </div>
          </div>
          <div className={styles.tags}>
            {tags?.map((tag) => (
              <Tag name={tag} />
            ))}
          </div>

          {/* <div className={styles.imgWrapper}>
            {tags && (
              <div className={styles.tagsWrapper}>
                <div className={styles.tagsContainer}>
                  {tags.map((tag) => {
                    return (
                      <BedrockText
                        text={tag}
                        type={"p"}
                        textAlign="left"
                        color={"black"}
                        style={{
                          backgroundColor: "rgb(140, 179, 255)",
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div> */}
        </div>
      )}

      {/* If actions are provided, a divider is shown and they are rendered */}
      {actions && (
        <>
          <div className={styles.actions}>{actions}</div>
        </>
      )}
    </div>
  );
};