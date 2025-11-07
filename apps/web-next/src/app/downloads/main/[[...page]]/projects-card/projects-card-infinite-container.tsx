"use client";

import { SearchProjectsDto } from "@/_lib/api";
import {
  ProjectsCardEmpty,
  ProjectsCardList,
  ProjectsCardLoader,
  useInfiniteProjectsFetch,
} from ".";

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
