"use client";

import { SearchProjectsDto } from "@/shared/api/openapi";
import { ProjectsCardEmpty } from "./projects-card-empty";
import { ProjectsCardList } from "./projects-card-list";
import { ProjectsCardLoader } from "./projects-card-loader";
import { useInfiniteProjectsFetch } from "@/pages/downloads/main/model/use-infinite-projects-fetch";

interface ProjectsCardInfiniteContainerProps {
  searchResults: SearchProjectsDto;
}

export const ProjectsCardInfiniteContainer = ({
  searchResults,
}: ProjectsCardInfiniteContainerProps) => {
  const { loading, projects, loadingMore, sentinelRef } =
    useInfiniteProjectsFetch({ searchResults });

  const items = projects?.items ?? [];
  const hasItems = items.length > 0;

  if (loading) {
    return <ProjectsCardLoader text="Fetching Projects..." />;
  }

  return (
    <>
      {!hasItems && <ProjectsCardEmpty />}
      {hasItems && <ProjectsCardList searchResults={projects!} />}
      {loadingMore && <ProjectsCardLoader text="Loading more..." />}
      <div ref={sentinelRef} />
    </>
  );
};
