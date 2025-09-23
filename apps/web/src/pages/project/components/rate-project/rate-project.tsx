import { Rating } from "~/components/rating";
import { styles } from ".";
import { useProjectManager } from "~/pages/project/providers/project-manager";
import { useProject } from "~/providers/project";

export const RateProject = () => {
  const { userRating, selectedProject, setSelectedProject } = useProjectManager();
  const { deleteRating, postRating } = useProject();

  const handleDeleteRating = async () => {
    if (!selectedProject) return;

    const newProjectRating = await deleteRating(selectedProject.id);
    if (!newProjectRating) return;
    setSelectedProject((prev) => ({ ...prev!, rating: newProjectRating }));
  };

  const handlePostRating = async (rating: number) => {
    if (!selectedProject) return;

    const newProjectRating = await postRating(selectedProject.id, rating);

    if (!newProjectRating) return;
    setSelectedProject((prev) => ({ ...prev!, rating: newProjectRating }));
  };

  return (
    <div className={styles.center}>
      <Rating
        rating={userRating}
        onReset={handleDeleteRating}
        onUpdate={async (rating) => await handlePostRating(rating)}
        className={styles.rating}
        extraClassName={styles.tooltip}
        selectable={true}
        size="medium"
      />
    </div>
  );
};
