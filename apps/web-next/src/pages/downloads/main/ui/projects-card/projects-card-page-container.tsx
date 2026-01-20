"use client";

import { ButtonGroup } from "@/shared/ui/button-group/button-group";
import { SearchProjectsDto } from "@/shared/api/openapi";
import { ProjectsCardEmpty } from "./projects-card-empty";
import { ProjectsCardList } from "./projects-card-list";
import { ProjectsCardPageNextButton } from "./projects-card-page-next-button";
import { ProjectsCardPagePrevButton } from "./projects-card-page-prev-button";

import styles from "./projects-card.module.scss";
import { usePageProjectsFetch } from "@/pages/downloads/main/model/use-page-projects-fetch";

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
