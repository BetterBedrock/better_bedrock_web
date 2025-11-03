"use client";

import { fetchSearchResults } from "@/_lib/projects/fetch-search-results";
import {
  ProjectsCardEmpty,
  ProjectsCardList,
  styles,
  useProjectsCardSearch,
} from ".";
import { MainProps } from "@/app/downloads/main/[[...page]]";
import { ProjectsCardPageNextButton } from "@/app/downloads/main/[[...page]]/projects-card/projects-card-page-next-button";
import { ProjectsCardPagePrevButton } from "@/app/downloads/main/[[...page]]/projects-card/projects-card-page-prev-button";
import { ButtonGroup } from "@/_components/button-group/button-group";
import { ProjectType, SearchOrder, SearchProjectsDto } from "@/_lib/api";
import { usePageProjectsFetch } from "@/app/downloads/main/[[...page]]/projects-card/hooks/use-page-projects-fetch";

interface ProjectsCardPageContainerProps {
  searchResults: SearchProjectsDto;
  currentPage: number;
}

export const ProjectsCardPageContainer = ({
  currentPage,
  searchResults,
}: ProjectsCardPageContainerProps) => {
  const projects = usePageProjectsFetch({ searchResults });
  const items = projects?.items ?? [];
  const hasItems = items.length > 0;

  return (
    <>
      {!hasItems && <ProjectsCardEmpty />}
      {hasItems && <ProjectsCardList searchResults={projects!} />}
      <ButtonGroup className={styles.actions}>
        {currentPage > 1 && (
          <ProjectsCardPagePrevButton currentPage={currentPage} />
        )}
        {currentPage < projects.totalPages && (
          <ProjectsCardPageNextButton currentPage={currentPage} />
        )}
      </ButtonGroup>
    </>
  );
};
