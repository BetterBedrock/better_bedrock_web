"use server";

import { GridDownloadCard } from "@/_components/grid-download-card";
import { fetchSubmittedProjects } from "@/_lib/projects/fetch-submitted-projects";
import { calculateLastChangedHours } from "./server/calculate-last-changed-hours";
import { ProjectsListEmpty } from "./projects-list-empty";

import styles from "./projects-list.module.scss";

export const ProjectsList = async () => {
  const projects = await fetchSubmittedProjects();

  if (projects.length === 0) {
    return <ProjectsListEmpty />;
  }
  
  return (
    <div className={styles.list}>
      {projects.map((project, index) => (
        <GridDownloadCard
          key={index}
          project={project}
          mode="review"
          tags={[`${calculateLastChangedHours(project.lastChanged)}h ago`]}
        />
      ))}
    </div>
  );
};
