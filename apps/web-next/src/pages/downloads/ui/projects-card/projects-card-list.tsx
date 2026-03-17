import { GridDownloadCard } from "@/shared/ui/grid-download-card";
import { SearchProjectsDto } from "@/shared/lib/openapi";

import styles from "./projects-card.module.scss";
import { pick } from "lodash";

interface ProjectsCardListProps {
  searchResults: SearchProjectsDto;
}

export const ProjectsCardList = ({ searchResults }: ProjectsCardListProps) => (
  <div className={styles.list}>
    {searchResults?.items.map((project, index) => (
      <GridDownloadCard
        key={project.id ?? index}
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
        )}
        userName={project.user.name}
        averageRating={project.rating.average}
        tags={project.tags.map((tag) => tag.name)}
        mode="view"
      />
    ))}
  </div>
);
