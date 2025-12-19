import { GridDownloadCard, ProjectMode } from "@/components/grid-download-card";
import styles from "./grid-download-card-list.module.scss";
import { SimpleProjectDto } from "@/lib/api";

interface GridDownloadCardListProps {
  projects: SimpleProjectDto[];
  mode?: ProjectMode;
}


export const GridDownloadCardList = ({ projects, mode }: GridDownloadCardListProps) => (
  <div className={styles.projects}>
    {projects.map((project) => (
      <GridDownloadCard key={project.id} project={project} mode={mode} />
    ))}
  </div>
);
