"use client";

import { Input } from "@/_components/input";

import { styles, useProjectsCardSearch } from ".";

export const ProjectsCardSearchBar = () => {
  const { inputRef } = useProjectsCardSearch();

  return (
    <Input
      ref={inputRef}
      placeholder="Search for a project"
      className={styles.searchbar}
    />
  );
};
