"use client";

import { ProjectsCardEmpty, ProjectsCardList, styles } from ".";

import {
  ProjectsCardPageNextButton,
  usePageProjectsFetch,
  ProjectsCardPagePrevButton,
} from ".";

import { ButtonGroup } from "@/_components/button-group/button-group";
import { SearchProjectsDto } from "@/_lib/api";

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
