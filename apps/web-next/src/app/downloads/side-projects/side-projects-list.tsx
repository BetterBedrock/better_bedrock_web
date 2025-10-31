import { GridDownloadCard } from "~/components/bedrock/grid-download-card/grid-download-card";
import { SimpleProjectDto } from "~/lib/api";

import { styles } from ".";

interface SideProjectsListProps {
  projects: SimpleProjectDto[];
}

export const SideProjectsList = ({ projects }: SideProjectsListProps) => (
  <div className={styles.grid}>
    {projects.map((project) => (
      <GridDownloadCard project={project} mode="view" />
    ))}
  </div>
);
