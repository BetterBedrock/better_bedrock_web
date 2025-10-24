import { CircularProgressIndicator } from "~/components/bedrock/circular-progress-indicator";
import { GridDownloadCard } from "~/components/bedrock/grid-download-card/grid-download-card";

import { ProjectsListEmpty, styles, useCalculateLastChangedHours, useFetchSubmittedProjects } from ".";

export const ProjectsList = () => {
  const projects = useFetchSubmittedProjects();

  if (!projects) {
    return <CircularProgressIndicator center />;
  }

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
          tags={[`${useCalculateLastChangedHours(project.lastChanged)}h ago`]}
        />
      ))}
    </div>
  );
};
