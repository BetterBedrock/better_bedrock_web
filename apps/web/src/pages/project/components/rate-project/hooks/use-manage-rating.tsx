import { useProjectManager } from "~/pages/project/providers/project-manager";
import { useProject } from "~/providers/project";

export const useManageRating = () => {
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

  return { handlePostRating, handleDeleteRating, userRating };
};
