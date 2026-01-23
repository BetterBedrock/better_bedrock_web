import { BedrockText } from "../bedrock-text/bedrock-text";

import clsx from "clsx";
import CardLayout from "@/public/ui/card/card_button.png";
import BBLogo from "@/public/images/logo.png";

import { ReactNode } from "react";
import { SimpleProjectDto } from "@/shared/lib/openapi";
import { PROJECT_TYPES } from "@/public/content/better-bedrock";
import { Routes } from "@/shared/lib/utils";
import { baseUrl } from "@/shared/lib/utils";

import { Avatar } from "@/shared/ui/avatar";
import { Link } from "@/shared/ui/link";
import { Tag } from "@/shared/ui/tag";
import { Tooltip } from "@/shared/ui/tooltip";
import { Rating } from "@/shared/ui/rating";
import { calculateLastChangedHours } from "@/shared/ui/grid-download-card/calculate-last-changed-hours";

import styles from "./grid-download-card.module.scss";

export type ProjectMode = "edit" | "view" | "review";

interface GridDownloadCardProps {
  project: SimpleProjectDto;
  mode?: ProjectMode;

  title?: string;
  downloadSize?: string;
  thumbnail?: string;
  description?: ReactNode;
  actions?: ReactNode;
  className?: string;
  useTopDivider?: boolean;
}

export const GridDownloadCard = ({
  className,
  project,
  mode,
}: GridDownloadCardProps) => {
  const tagName =
    mode === "edit" && project.submitted
      ? "Submitted"
      : mode === "review"
        ? `${calculateLastChangedHours(project.lastChanged)}h ago`
        : null;

  const link = () => {
    if (!mode) return;
    if (mode === "edit") return Routes.PROJECT_EDIT + "/" + project.id;
    if (mode === "review") return Routes.PROJECT_REVIEW + "/" + project.id;
    return Routes.PROJECT_PREVIEW + "/" + project.id;
  };

  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.author}>
        <Avatar className={styles.header} name={project.user.name}>
          <Avatar.Profile name={project.user.name} size="small" link={false} />

          <Avatar.Details name={project.user.name} link={false} at />
        </Avatar>
      </div>
      <Link link={link()} className={clsx(styles.link, styles.body)}>
        <div className={styles.background}>
          {!project.thumbnail || project.thumbnail === "" ? (
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
            <img
              src={baseUrl + "/" + project.thumbnail}
              alt={`Thumbnail for ${project.title}`}
              className={styles.thumbnail}
            />
          )}

          <div className={styles.details}>
            <Tag border={["top", "right"]} name={PROJECT_TYPES[project.type]} />
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
            style={{ borderImage: `url(${CardLayout.src})` }}
          >
            <div className={styles.information}>
              <div className={styles.title}>
                {project.betterBedrockContent && (
                  <Tooltip text="Official Better Bedrock Content">
                    <Tag
                      className={styles.bb}
                      border={[]}
                      name={
                        <img src={BBLogo.src} className={styles.logo}></img>
                      }
                    />
                  </Tooltip>
                )}
                <BedrockText
                  text={project.title}
                  type="h3"
                  font="Minecraft"
                  textAlign="left"
                  color="white"
                />
              </div>
              <div className={styles.tags2}>
                {project.tags?.map((tag, index) => (
                  <BedrockText
                    key={`${tag.name}${index}`}
                    text={`#${tag.name}`}
                    type="p2"
                    textAlign="left"
                    extraClassName={styles.tag}
                  />
                ))}
              </div>
            </div>

            {<Rating simple rating={project.rating.average} />}
          </div>
        </div>
      </Link>
    </div>
  );
};
