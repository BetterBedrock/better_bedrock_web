import { ProjectMode } from "@/shared/ui/grid-download-card";
import { DetailedProjectDto } from "@/shared/lib/openapi";
import { ProjectHeaderCard } from "@/pages/project/ui/project-header/project-header-card";
import { ProjectHeaderErrorBanner } from "@/pages/project/ui/project-header/project-header-error-banner";
import { ProjectHeaderInfoBanner } from "@/pages/project/ui/project-header/project-header-info-banner";

interface ProjectHeaderProps {
  mode: ProjectMode;
  selectedProject: DetailedProjectDto;
}

export const ProjectHeader = ({
  mode,
  selectedProject,
}: ProjectHeaderProps) => (
  <>
    {mode === "edit" && selectedProject.submitted && (
      <ProjectHeaderInfoBanner />
    )}
    {selectedProject.error && (
      <ProjectHeaderErrorBanner message={selectedProject.error} />
    )}
    <ProjectHeaderCard mode={mode} selectedProject={selectedProject} />
  </>
);
