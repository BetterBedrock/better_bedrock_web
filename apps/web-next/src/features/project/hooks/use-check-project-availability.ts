import { ProjectMode } from "@/components/grid-download-card";
import { DetailedProjectDto } from "@/lib/api";
import { useProject } from "@/providers/project";
import { useState, useEffect } from "react";

interface UseHeaderProps {
  mode: ProjectMode;
  selectedProject?: DetailedProjectDto | undefined;
}

export const useCheckProjectAvailability = ({ mode, selectedProject }: UseHeaderProps) => {
  const { fetchProjectsBasicInfo } = useProject();
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    const checkIfPublished = async () => {
      if (!selectedProject) return;

      const details = await fetchProjectsBasicInfo([selectedProject.id]);

      if (details && details?.length > 0) {
        setIsPublished(true);
      }
    };

    if (mode === "edit") checkIfPublished();
  }, [fetchProjectsBasicInfo, mode, selectedProject]);

  return isPublished;
};
