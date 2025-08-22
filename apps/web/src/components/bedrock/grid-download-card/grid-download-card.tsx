import React from "react";
import { BedrockText } from "../bedrock-text/bedrock-text";
import styles from "./grid-download-card.module.scss";
import clsx from "clsx";
import Steve from "~/assets/images/avatars/Steve.png";
import { Tag } from "~/components/bedrock/tag";
import { Rating } from "~/components/rating";
import { SimpleProjectDto } from "~/lib/api";
import { baseUrl } from "~/utils/url";
import { Link } from "~/components/link";
import { Routes } from "~/utils/routes";
import { PreviewMode } from "~/pages/preview";

interface GridDownloadCardProps {
  project: SimpleProjectDto;
  mode?: PreviewMode;

  title?: string;
  downloadSize?: string;
  thumbnail?: string;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  useTopDivider?: boolean;
  tags?: string[];
}

export const GridDownloadCard = ({
  className,

  project,
  mode,
}: GridDownloadCardProps) => {
  const link = () => {
    if (mode === "edit") return Routes.EDITOR + "/" + project.id;
    if (mode === "review") return Routes.REVIEW + "/" + project.id;
    return Routes.PREVIEW + "/" + project.id;
  };

  return (
    <div className={clsx(styles.container, className)}>
      <Link link={Routes.PROFILE + "/" + project.user.name} className={styles.link}>
        <div className={styles.header}>
          <img src={Steve} className={styles.avatar} />

          {/* Renders the description, which can now be any React node */}
          <div>
            <BedrockText text={`@${project.user.name}`} type={"p"} textAlign="left" color="white" />

            <Rating simple rating={2.5} />
          </div>
        </div>
      </Link>

      <Link link={link()} className={styles.link}>
        <div className={styles.background}>
          {!project.thumbnail || project.thumbnail === "" ? (
            <div className={styles.empty}>
              <BedrockText
                text={"404 No Thumbnail"}
                type="h1"
                font="MinecraftTen"
                textAlign="left"
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
            <div className={styles.title}>
              <BedrockText
                text={project.title}
                type="h2"
                font="MinecraftTen"
                textAlign="left"
                color="white"
              />
            </div>
          </div>
          <div className={styles.tags}>
            {project.tags.map((tag) => (
              <Tag border={["left", "bottom"]} name={tag} />
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};
