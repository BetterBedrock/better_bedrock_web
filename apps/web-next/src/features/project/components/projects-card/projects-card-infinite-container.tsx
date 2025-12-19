"use client";

import { SearchProjectsDto } from "@/lib/api";
import { useInfiniteProjectsFetch } from "../../hooks/use-infinite-projects-fetch";
import { ProjectsCardEmpty } from "./projects-card-empty";
import { ProjectsCardList } from "./projects-card-list";
import { ProjectsCardLoader } from "./projects-card-loader";

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
