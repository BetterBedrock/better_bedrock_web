import { Project } from "~/pages/project/project";
import { ProjectManagerProvider } from "~/pages/project/providers/project-manager";
import { DownloadProvider } from "~/providers/download";

export const ProjectWrapper = () => (
  <DownloadProvider>
    <ProjectManagerProvider>
      <Project />
    </ProjectManagerProvider>
  </DownloadProvider>
);
