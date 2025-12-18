"use client";

import { Input } from "@/_components/input";
import { useProjectsCardSearch } from "./providers/projects-card-search";

import styles from "./projects-card.module.scss";

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
