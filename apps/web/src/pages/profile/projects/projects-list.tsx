import { GridDownloadCard } from "~/components/bedrock/grid-download-card/grid-download-card";
import { CircularProgressIndicator } from "~/components/bedrock/circular-progress-indicator";

import { styles, ProjectsListEmpty, useFetchProjectsUserId } from ".";

export const ProjectsList = () => {
  const projects = useFetchProjectsUserId();

  if (!projects) {
    return <CircularProgressIndicator className={styles.loading} size="medium" />;
  }

  if (projects.length < 1) {
    return <ProjectsListEmpty />;
  }

  return (
    <div className={styles.projects}>
      {projects.map((project) => (
        <GridDownloadCard key={project.id} project={project} mode="view" />
      ))}
    </div>
  );
};
