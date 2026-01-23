import { GridDownloadCard } from "@/shared/ui/grid-download-card";
import { SearchProjectsDto } from "@/shared/lib/openapi";

import styles from "./projects-card.module.scss";

interface ProjectsCardListProps {
  searchResults: SearchProjectsDto;
}

export const ProjectsCardList = ({ searchResults }: ProjectsCardListProps) => (
  <div className={styles.list}>
    {searchResults!.items.map((project, index) => (
      <GridDownloadCard
        key={project.id ?? index}
        project={project}
        mode="view"
      />
    ))}
  </div>
);
