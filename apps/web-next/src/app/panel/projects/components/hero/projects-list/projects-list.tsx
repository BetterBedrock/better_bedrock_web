"use server";

import { GridDownloadCard } from "@/_components/grid-download-card";
import { styles, calculateLastChangedHours, ProjectsListEmpty } from ".";
import { fetchSubmittedProjects } from "@/_lib/projects/fetch-submitted-projects";

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
