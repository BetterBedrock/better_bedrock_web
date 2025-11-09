import { ProjectMode } from "@/_components/grid-download-card";
// import { EditMode } from "@/app/project/components/description/edit-mode";
import { ViewMode } from ".";
import { DetailedProjectDto } from "@/_lib/api";

interface DescriptionProps {
  mode: ProjectMode;
  detailedProject: DetailedProjectDto;
}

export const Description = ({ mode, detailedProject }: DescriptionProps) => {
  // console.log({ detailedProject });
  // const { editorContent } = useProjectManager();

  // if (editorContent.current === undefined) {
  //   editorContent.current = detailedProject.description;
  // }

  return mode === "edit" ? (
    <ViewMode detailedProject={detailedProject} />
  ) : (
    <ViewMode detailedProject={detailedProject} />
  );
};
