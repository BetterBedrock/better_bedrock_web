import { GridDownloadCard } from "@/_components/grid-download-card";
import { SimpleProjectDto } from "@/_lib/api";

import styles from "./side-projects.module.scss";

interface SideProjectsListProps {
  projects: SimpleProjectDto[];
}

export const SideProjectsList = ({ projects }: SideProjectsListProps) => (
  <div className={styles.grid}>
    {projects.map((project) => (
      <GridDownloadCard key={project.id} project={project} mode="view" />
    ))}
  </div>
);
