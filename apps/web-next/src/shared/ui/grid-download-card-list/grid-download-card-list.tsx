import { GridDownloadCard, ProjectMode } from "@/shared/ui/grid-download-card";
import styles from "./grid-download-card-list.module.scss";
import { SimpleProjectDto } from "@/shared/api/openapi";

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
