import { ProjectMode } from "@/shared/ui/grid-download-card";
import { DetailedProjectDto } from "@/shared/api/openapi";
import { EditMode } from "@/widgets/project-description/ui/edit-mode/edit-mode";
import { ViewMode } from "@/widgets/project-description/ui/view-mode/view-mode";

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
