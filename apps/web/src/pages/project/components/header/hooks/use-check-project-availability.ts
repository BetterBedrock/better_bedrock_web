import { useState, useEffect } from "react";
import { DetailedProjectDto } from "~/lib/api";
import { ProjectMode } from "~/pages/project/project";
import { useProject } from "~/providers/project";

interface UseHeaderProps {
  mode: ProjectMode;
  selectedProject?: DetailedProjectDto | undefined;
}

export const useCheckProjectAvailability = ({ mode, selectedProject }: UseHeaderProps) => {
  const { fetchProjectsBasicInfo } = useProject();
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    if (mode === "edit") checkIfPublished();
  }, [selectedProject]);

  const checkIfPublished = async () => {
    if (!selectedProject) return;

    const details = await fetchProjectsBasicInfo([selectedProject.id]);

    if (details && details?.length > 0) {
      setIsPublished(true);
    }
  };

  return isPublished;
};
