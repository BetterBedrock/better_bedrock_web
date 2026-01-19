import { GridDownloadCard, ProjectMode } from "@/shared/ui/grid-download-card";
import { SimpleProjectDto } from "@/shared/lib/openapi";

import styles from "./grid-download-card-list.module.scss";

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
      <GridDownloadCard key={project.id} project={project} mode={mode} />
    ))}
  </div>
);
