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

interface GridDownloadCardProps {
  project: SimpleProjectDto;
  mode?: ProjectMode;

  title?: string;
  downloadSize?: string;
  thumbnail?: string;
  description?: React.ReactNode;
  actions?: React.ReactNode;
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
      <Link link={link()} className={clsx(styles.link, styles.body)}>
        <div className={styles.background}>
          {!project.thumbnail || project.thumbnail === "" ? (
            <div className={styles.empty}>
              <BedrockText
                text={"404 No Thumbnail"}
                type="h1"
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

          <div className={styles.author}>
            <Avatar className={styles.header} name={project.user.name}>
              <Avatar.Profile name={project.user.name} size="small" />

              <Avatar.Details name={project.user.name} at />
            </Avatar>
          </div>

          <div className={styles.details}>
            <Tag border={["top", "right"]} name={PROJECT_TYPES[project.type]} />
            {tags?.map((tag) => (
              <Tag border={["top", "right"]} name={tag} className={styles.special} />
            ))}
            {project.betterBedrockContent && (
              <Tag border={["top", "right"]} name={<img src={BBLogo} className={styles.logo}></img>} className={styles.bb} />
            )}
          </div>
        </div>
        <div className={styles.footer}>
          <div
            className={clsx(styles.foreground, styles.bottom)}
            style={{ borderImage: `url(${CardLayout})` }}
          >
            <div className={styles.information}>
              <BedrockText
                text={project.title}
                type="h2"
                font="Minecraft"
                textAlign="left"
                color="white"
              />
              <div className={styles.tags2}>
                {project.tags?.map((tag) => (
                  <BedrockText
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
