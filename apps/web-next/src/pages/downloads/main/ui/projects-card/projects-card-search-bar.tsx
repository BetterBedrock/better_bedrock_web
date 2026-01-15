"use client";

import { Input } from "@/shared/ui/input";
import { ProjectsCardOrder } from "./projects-card-order";
import { useProjectsCardSearch } from "@/pages/downloads/main/model/projects-card-search";

import styles from "./projects-card.module.scss";

export const ProjectsCardSearchBar = () => {
  const { inputRef } = useProjectsCardSearch();

  return (
    <div className={styles.searchbarContainer}>
      <Input
        sub
        ref={inputRef}
        placeholder="Search for a project"
        className={styles.searchbar}
      />
      <ProjectsCardOrder className={styles.orderHalf} />
    </div>
  );
};
