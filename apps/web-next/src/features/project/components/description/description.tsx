import { ProjectMode } from "@/components/grid-download-card";
import { DetailedProjectDto } from "@/lib/api";
import { EditMode } from "@/features/project/components/description/edit-mode/edit-mode";
import { ViewMode } from "@/features/project/components/description/view-mode/view-mode";

interface DescriptionProps {
  mode: ProjectMode;
  detailedProject: DetailedProjectDto;
}

export const Description = ({ mode, detailedProject }: DescriptionProps) =>
  mode === "edit" ? (
    <EditMode detailedProject={detailedProject} />
  ) : (
    <ViewMode detailedProject={detailedProject} />
  );
