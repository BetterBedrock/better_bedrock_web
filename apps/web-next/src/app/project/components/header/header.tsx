import { ProjectMode } from "@/_components/grid-download-card";
import { HeaderCard, HeaderErrorBanner, HeaderInfoBanner } from ".";
import { DetailedProjectDto } from "@/_lib/api";

interface HeaderProps {
  mode: ProjectMode;
  selectedProject: DetailedProjectDto;
}

export const Header = ({ mode, selectedProject }: HeaderProps) => {
  if (!selectedProject) return;

  return (
    <>
      {/* {mode === "edit" && isPublished && <HeaderImportantBanner />} */}
      {mode === "edit" && selectedProject.submitted && <HeaderInfoBanner />}
      {selectedProject.error && (
        <HeaderErrorBanner message={selectedProject.error} />
      )}
      <HeaderCard mode={mode} selectedProject={selectedProject} />
    </>
  );
};
