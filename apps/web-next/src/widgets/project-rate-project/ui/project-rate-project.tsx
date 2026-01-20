import { Rating } from "@/shared/ui/rating";
import { fetchUserProjectRating } from "@/lib/user/fetch-user-project-rating";
import { DetailedProjectDto } from "@/shared/api/openapi";
import { manageRating } from "@/entities/project/api/manage-rating";
import styles from "./project-rate-project.module.scss";

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
