import {
  ProjectsCardEmpty,
  ProjectsCardList,
  ProjectsCardLoader,
  useInfiniteProjectsFetch,
} from ".";

export const ProjectsCardContainer = () => {
  const { loading, searchResults, loadingMore, sentinelRef } = useInfiniteProjectsFetch();

  const items = searchResults?.items ?? [];
  const hasItems = items.length > 0;

  if (loading && !searchResults) {
    return <ProjectsCardLoader text="Fetching Projects..." />;
  }

  return (
    <>
      {!hasItems && <ProjectsCardEmpty />}
      {hasItems && <ProjectsCardList searchResults={searchResults!} />}
      {loadingMore && <ProjectsCardLoader text="Loading more..." />}
      <div ref={sentinelRef} />
    </>
  );
};
