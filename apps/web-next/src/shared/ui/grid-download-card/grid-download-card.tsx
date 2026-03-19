import { BedrockText } from "../bedrock-text/bedrock-text";

import clsx from "clsx";

import {
  ProjectType,
} from "@/shared/lib/openapi";
import { PROJECT_TYPES } from "@/shared/config/better-bedrock";
import { Routes } from "@/shared/lib/utils";
import { baseUrl } from "@/shared/lib/utils";

import { Avatar } from "@/shared/ui/avatar";
import { Link } from "@/shared/ui/link";
import { Tag } from "@/shared/ui/tag";
import { Tooltip } from "@/shared/ui/tooltip";
import { Rating } from "@/shared/ui/rating";
import { calculateLastChangedHours } from "@/shared/ui/grid-download-card/calculate-last-changed-hours";

import styles from "./grid-download-card.module.scss";
import Image from "next/image";

export type ProjectMode = "edit" | "view" | "review";

interface GridDownloadCardProps {
  id?: string;
  title?: string;
  submitted?: boolean;
  lastChanged: string;
  userName: string;
  thumbnail: string | null;
  type: ProjectType;
  betterBedrockContent?: boolean;
  tags?: string[];
  averageRating?: number;

  mode?: ProjectMode;
  className?: string;
}

export const GridDownloadCard = ({
  id,
  title,
  submitted,
  lastChanged,
  userName,
  thumbnail,
  type,
  betterBedrockContent,
  tags,
  averageRating,
  className,
  mode,
}: GridDownloadCardProps) => {
  const tagName =
    mode === "edit" && submitted
      ? "Submitted"
      : mode === "review"
        ? `${calculateLastChangedHours(lastChanged)}h ago`
        : null;

  const link = () => {
    if (!mode) return;
    if (mode === "edit") return Routes.PROJECT_EDIT + "/" + id;
    if (mode === "review") return Routes.PROJECT_REVIEW + "/" + id;
    return Routes.PROJECT_PREVIEW + "/" + id;
  };

  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.author}>
        <Avatar className={styles.header} name={userName}>
          <Avatar.Profile name={userName} size="small" link={false} />

          <Avatar.Details name={userName} link={false} at />
        </Avatar>
      </div>
      <Link link={link()} className={clsx(styles.link, styles.body)}>
        <div className={styles.background}>
          {!thumbnail || thumbnail === "" ? (
            <div className={styles.empty}>
              <BedrockText
                text="404 No Thumbnail"
                type="h4"
                font="Minecraft"
                textAlign="center"
                color="white"
              />
            </div>
          ) : (
            <Image
              width={960}
              height={540}
              src={baseUrl + "/" + thumbnail}
              alt={`Thumbnail for ${title}`}
              className={styles.thumbnail}
            />
          )}

          <div className={styles.details}>
            <Tag border={["top", "right"]} name={PROJECT_TYPES[type]} />
            {tagName && (
              <Tag
                border={["top", "right"]}
                name={tagName}
                className={styles.special}
              />
            )}
          </div>
        </div>
        <div className={styles.footer}>
          <div
            className={clsx(styles.foreground, styles.bottom)}
            style={{ borderImage: `url(/ui/card/card_button.png)` }}
          >
            <div className={styles.information}>
              <div className={styles.title}>
                {betterBedrockContent && (
                  <Tooltip text="Official Better Bedrock Content">
                    <Tag
                      className={styles.bb}
                      border={[]}
                      name={
                        <img
                          src="/images/logo.png"
                          className={styles.logo}
                        ></img>
                      }
                    />
                  </Tooltip>
                )}
                <BedrockText
                  text={title}
                  extraClassName={styles.titleText}
                  type="h3"
                  font="Minecraft"
                  textAlign="left"
                  color="white"
                />
              </div>
              <div className={styles.tags2}>
                {tags?.map((tag, index) => (
                  <BedrockText
                    key={`${tag}${index}`}
                    text={`#${tag}`}
                    type="p2"
                    textAlign="left"
                    extraClassName={styles.tag}
                  />
                ))}
              </div>
            </div>

            {<Rating simple rating={averageRating} />}
          </div>
        </div>
      </Link>
    </div>
  );
};
