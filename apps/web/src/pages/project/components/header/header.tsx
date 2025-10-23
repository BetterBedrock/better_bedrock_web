import { ProjectMode } from "~/pages/project";
import {
  HeaderCard,
  HeaderErrorBanner,
  HeaderImportantBanner,
  HeaderInfoBanner,
  useCheckProjectAvailability,
} from ".";
import { useProjectManager } from "~/pages/project/providers/project-manager";

interface HeaderProps {
  mode: ProjectMode;
}

export const Header = ({ mode }: HeaderProps) => {
  const { selectedProject } = useProjectManager();
  const isPublished = useCheckProjectAvailability({ mode });
  
  if (!selectedProject) return;

  return (
    <>
      {mode === "edit" && isPublished && <HeaderImportantBanner />}
      {mode === "edit" && selectedProject.submitted && <HeaderInfoBanner />}
      {selectedProject.error && <HeaderErrorBanner message={selectedProject.error} />}
      <HeaderCard mode={mode} />
    </>
  );
};
