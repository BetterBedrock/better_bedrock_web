import { ProjectMode } from "@/components/grid-download-card";
import { DetailedProjectDto } from "@/lib/api";
import { HeaderCard } from "@/features/project/components/header/header-card";
import { HeaderErrorBanner } from "@/features/project/components/header/header-error-banner";
import { HeaderInfoBanner } from "@/features/project/components/header/header-info-banner";

interface HeaderProps {
  mode: ProjectMode;
  selectedProject: DetailedProjectDto;
}

export const Header = ({ mode, selectedProject }: HeaderProps) => (
  <>
    {mode === "edit" && selectedProject.submitted && <HeaderInfoBanner />}
    {selectedProject.error && (
      <HeaderErrorBanner message={selectedProject.error} />
    )}
    <HeaderCard mode={mode} selectedProject={selectedProject} />
  </>
);
