import { Rating } from "@/shared/ui/rating";
import { DetailedProjectDto } from "@/shared/lib/openapi";
import { manageRating } from "@/entities/project";
import styles from "./project-rate-project.module.scss";
import { fetchUserProjectRating } from "@/entities/user";

interface ProjectRateProjectProps {
  detailedProject: DetailedProjectDto;
}

export const ProjectRateProject = async ({
  detailedProject,
}: ProjectRateProjectProps) => {
  const userRating = await fetchUserProjectRating(detailedProject.id);
  const { handleReset, handleUpdate } = await manageRating(detailedProject.id);

  return (
    <div className={styles.center}>
      <Rating
        rating={userRating}
        onReset={handleReset}
        onUpdate={handleUpdate}
        className={styles.rating}
        extraClassName={styles.tooltip}
        selectable={true}
        size="medium"
      />
    </div>
  );
};
