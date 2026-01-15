import { ProjectMode } from "@/shared/ui/grid-download-card";
import { DetailedProjectDto } from "@/shared/api/openapi";
import { ProjectHeaderCard } from "@/widgets/project-header/ui/project-header-card";
import { ProjectHeaderErrorBanner } from "@/widgets/project-header/ui/project-header-error-banner";
import { ProjectHeaderInfoBanner } from "@/widgets/project-header/ui/project-header-info-banner";

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
