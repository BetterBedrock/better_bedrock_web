import { ProjectMode } from "@/shared/ui/grid-download-card";
import { DetailedProjectDto } from "@/shared/lib/openapi";
import { EditMode } from "@/pages/project/ui/project-description/edit-mode/edit-mode";
import { ViewMode } from "@/pages/project/ui/project-description/view-mode/view-mode";

interface ProjectDescriptionProps {
  mode: ProjectMode;
  detailedProject: DetailedProjectDto;
}

export const ProjectDescription = ({
  mode,
  detailedProject,
}: ProjectDescriptionProps) =>
  mode === "edit" ? (
    <EditMode detailedProject={detailedProject} />
  ) : (
    <ViewMode detailedProject={detailedProject} />
  );
