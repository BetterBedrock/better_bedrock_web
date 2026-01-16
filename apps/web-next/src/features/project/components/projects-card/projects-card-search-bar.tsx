"use client";

import { Input } from "@/components/input";
import { useProjectsCardSearch } from "../../providers/projects-card-search";

import styles from "./projects-card.module.scss";
import { ProjectsCardOrder } from "./projects-card-order";

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
