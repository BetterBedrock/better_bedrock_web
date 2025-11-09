import { Rating } from "@/_components/rating";
import { manageRating, styles } from ".";
import { fetchUserProjectRating } from "@/_lib/user/fetch-user-project-rating";
import { DetailedProjectDto } from "@/_lib/api";

interface RateProjectProps {
  detailedProject: DetailedProjectDto;
}

export const RateProject = async ({ detailedProject }: RateProjectProps) => {
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
