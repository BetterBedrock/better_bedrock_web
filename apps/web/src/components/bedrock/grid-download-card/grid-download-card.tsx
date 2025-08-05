import React from "react";
import { BedrockText } from "../bedrock-text/bedrock-text";
import styles from "./grid-download-card.module.scss";
import clsx from "clsx";

// The Button and ButtonSeparator components will now be passed in via the `actions` prop.

interface GridDownloadCardProps {
  title?: string;
  downloadSize?: string;
  thumbnail?: React.ReactNode;
  /** Allows passing custom components, not just strings */
  description?: React.ReactNode;
  /** Accepts any React node to render in the footer, like buttons */
  actions?: React.ReactNode;
  /** Allows for adding custom CSS classes for further styling */
  className?: string;
  useTopDivider?: boolean;
  tags?: string[]; // Changed to string[] to allow for any tags
}

export const GridDownloadCard: React.FC<GridDownloadCardProps> = ({
  title,
  downloadSize,
  description,
  thumbnail,
  actions,
  className,
  useTopDivider = false,
  tags
}) => {
  return (
    <div className={clsx(styles.container, className)}>
      {thumbnail && (
        <div className={styles.thumbnailWrapper}>
          {thumbnail}
          <div className={styles.imgWrapper}>
            {tags && (
              <div className={styles.tagsWrapper}>
                <div className={styles.tagsContainer}>
                  {tags.map(tag => {
                    return (
                      < BedrockText
                        text={tag}
                        type={"p"}
                        textAlign="left"
                        color={"black"}
                        style={{
                          backgroundColor: "rgb(140, 179, 255)"
                        }}
                      />
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {useTopDivider && <GridDownloadCardDivider />}
      <div className={styles.texts}>
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
        {/* Renders the description, which can now be any React node */}
        {description}
      </div>

      {/* If actions are provided, a divider is shown and they are rendered */}
      {actions && (
        <>
          <GridDownloadCardDivider />
          <div className={styles.actions}>{actions}</div>
        </>
      )}
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
