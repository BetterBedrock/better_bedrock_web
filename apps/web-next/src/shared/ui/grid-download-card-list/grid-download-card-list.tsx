import { GridDownloadCard, ProjectMode } from "@/shared/ui/grid-download-card";
import { SimpleProjectDto } from "@/shared/lib/openapi";

import styles from "./grid-download-card-list.module.scss";
import { pick } from "lodash";

interface GridDownloadCardListProps {
  projects: SimpleProjectDto[];
  mode?: ProjectMode;
}

export const GridDownloadCardList = ({
  projects,
  mode = "view",
}: GridDownloadCardListProps) => (
  <div className={styles.projects}>
    {projects.map((project) => (
      <GridDownloadCard
        key={project.id}
        {...pick(
          project,
          "id",
          "title",
          "submitted",
          "lastChanged",
          "thumbnail",
          "type",
          "betterBedrockContent",
          "tags",
          "summary",
        )}
        userName={project.user.name}
        tags={project.tags.map((tag) => tag.name)}
        averageRating={project.rating.average}
        mode={mode}
      />
    ))}
  </div>
);
