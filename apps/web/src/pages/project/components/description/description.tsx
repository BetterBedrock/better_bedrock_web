import { useProjectManager } from "~/pages/project/providers/project-manager";
import { ProjectMode } from "~/pages/project";

import { EditMode, ViewMode } from ".";

interface DescriptionProps {
  mode: ProjectMode;
}

export const Description = ({ mode }: DescriptionProps) => {
  const { selectedProject, editorContent } = useProjectManager();

  if (editorContent.current === undefined) {
    editorContent.current = selectedProject?.description;
  }

  return mode === "edit" ? <EditMode /> : <ViewMode />;
};
