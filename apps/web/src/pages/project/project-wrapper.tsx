import { Project } from "~/pages/project/project";
import { ProjectManagerProvider } from "~/pages/project/providers/project-manager";

export const ProjectWrapper = () => (
  <ProjectManagerProvider>
    <Project />
  </ProjectManagerProvider>
);
