import { ProjectMode } from "@/_components/grid-download-card";
// import { EditMode } from "@/app/project/components/description/edit-mode";
import { ViewMode } from ".";
import { DetailedProjectDto } from "@/_lib/api";
import { EditMode } from "@/app/project/components/description/edit-mode";

interface DescriptionProps {
  mode: ProjectMode;
  detailedProject: DetailedProjectDto;
}

export const Description = ({ mode, detailedProject }: DescriptionProps) => {
  return mode === "edit" ? (
    <EditMode detailedProject={detailedProject} />
  ) : (
    <ViewMode detailedProject={detailedProject} />
  );
};
