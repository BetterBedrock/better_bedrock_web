import { DetailedProjectDto } from "@/shared/lib/openapi";
import { fetchUserProjectRating } from "@/entities/user";
import { ProjectRateRating } from "./project-rate-rating";

import styles from "./project-rate-project.module.scss";

interface ProjectRateProjectProps {
  detailedProject: DetailedProjectDto;
}

export const ProjectRateProject = async ({
  detailedProject,
}: ProjectRateProjectProps) => {
  const userRating = await fetchUserProjectRating(detailedProject.id);

  return (
    <div className={styles.center}>
      <ProjectRateRating id={detailedProject.id} userRating={userRating} />
    </div>
  );
};
