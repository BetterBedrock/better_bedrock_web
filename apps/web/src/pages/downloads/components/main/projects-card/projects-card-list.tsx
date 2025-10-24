import { GridDownloadCard } from "~/components/bedrock/grid-download-card/grid-download-card";
import { SearchProjectsDto } from "~/lib/api";

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
