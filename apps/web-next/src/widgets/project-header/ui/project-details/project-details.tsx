import clsx from "clsx";
import { ProjectMode } from "@/shared/ui/grid-download-card";
import { Rating } from "@/shared/ui/rating";
import { DetailedProjectDto } from "@/shared/api/openapi";
import { fetchLoggedUser } from "@/lib/auth";
import { ProjectDetailsReport } from "@/widgets/project-header/ui/project-details/project-details-report";
import { ProjectDetailsTitle } from "@/widgets/project-header/ui/project-details/project-details-title";
import { ProjectDetailsEditButton } from "@/widgets/project-header/ui/project-details/project-details-edit-button";

import styles from "./project-details.module.scss";

interface ProjectDetailsProps {
  mode: ProjectMode;
  detailedProject: DetailedProjectDto;
}

export const ProjectDetails = async ({
  mode,
  detailedProject,
}: ProjectDetailsProps) => {
  const user = await fetchLoggedUser();

  const canEdit =
    mode !== "edit" && (user?.admin || user?.id === detailedProject!.userId);
  const canReport =
    mode === "view" && user && user?.id !== detailedProject.userId;

  return (
    <div className={clsx(styles.editor)}>
      <div className={styles.title}>
        <ProjectDetailsTitle detailedProject={detailedProject} />
        {canReport && (
          <ProjectDetailsReport detailedProject={detailedProject} />
        )}
        {canEdit && (
          <ProjectDetailsEditButton detailedProject={detailedProject} />
        )}
      </div>
      {mode === "view" && (
        <Rating
          rating={detailedProject.rating.average}
          suffix={`(${detailedProject.rating.count} All Project Ratings)`}
          extraClassName={styles.rating}
        />
      )}
    </div>
  );
};
