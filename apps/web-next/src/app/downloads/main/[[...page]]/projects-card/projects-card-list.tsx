import { GridDownloadCard } from "@/_components/grid-download-card";
import { SearchProjectsDto } from "@/_lib/api";

import { styles } from ".";

interface ProjectsCardListProps {
  searchResults: SearchProjectsDto;
}

export const ProjectsCardList = ({ searchResults }: ProjectsCardListProps) => (
  <div className={styles.list}>
    {searchResults!.items.map((project, index) => (
      <GridDownloadCard key={project.id ?? index} project={project} mode="view" />
    ))}
  </div>
);
