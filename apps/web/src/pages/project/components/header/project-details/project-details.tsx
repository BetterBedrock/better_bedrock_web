import clsx from "clsx";
import { Rating } from "~/components/rating";
import { useProjectManager } from "~/pages/project/providers/project-manager";
import { useAuth } from "~/providers/auth";
import { ProjectMode } from "~/pages/project/project";

import { ProjectDetailsEditButton, ProjectDetailsReport, ProjectDetailsTitle, styles } from ".";

interface ProjectDetailsProps {
  mode: ProjectMode;
}

export const ProjectDetails = ({ mode }: ProjectDetailsProps) => {
  const { user } = useAuth();
  const { selectedProject } = useProjectManager();

  const canEdit = mode !== "edit" && (user?.admin || user?.id === selectedProject!.userId);
  const canReport = mode === "view" && user && user?.id !== selectedProject!.userId;

  return (
    <div className={clsx(styles.editor)}>
      <div className={styles.title}>
        <ProjectDetailsTitle />
        {canReport && <ProjectDetailsReport />}
        {canEdit && <ProjectDetailsEditButton />}
      </div>
      {mode === "view" && (
        <Rating
          rating={selectedProject!.rating.average}
          suffix={`(${selectedProject!.rating.count} All Project Ratings)`}
          extraClassName={styles.rating}
        />
      )}
    </div>
  );
};
