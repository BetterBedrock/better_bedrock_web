import { BedrockText } from "../bedrock-text/bedrock-text";
import styles from "./grid-download-card.module.scss";
import clsx from "clsx";
import { Tag } from "~/components/bedrock/tag";
import { Rating } from "~/components/rating";
import { SimpleProjectDto } from "~/lib/api";
import { baseUrl } from "~/utils/url";
import { Link } from "~/components/link";
import { Routes } from "~/utils/routes";
import { PROJECT_TYPES } from "~/assets/content/better-bedrock";
import CardLayout from "~/assets/ui/card/card_button.png";
import { ProjectMode } from "~/pages/project";
import BBLogo from "~/assets/images/logo.png";
import { Tooltip } from "~/components/bedrock/tooltip";
import { Avatar } from "~/components/avatar";
import { ReactNode } from "react";

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
  tags?: string[];
}

export const GridDownloadCard = ({ className, tags, project, mode }: GridDownloadCardProps) => {
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
            {tags?.map((tag, index) => (
              <Tag
                key={`${tag}${index}`}
                border={["top", "right"]}
                name={tag}
                className={styles.special}
              />
            ))}
          </div>
        </div>
        <div className={styles.footer}>
          <div
            className={clsx(styles.foreground, styles.bottom)}
            style={{ borderImage: `url(${CardLayout})` }}
          >
            <div className={styles.information}>
              <div className={styles.title}>
                {project.betterBedrockContent && (
                  <Tooltip text="Official Better Bedrock Content">
                    <Tag
                      className={styles.bb}
                      border={[]}
                      name={<img src={BBLogo} className={styles.logo}></img>}
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
