import { Section } from "@/_components/section";
// import { DownloadProvider } from "@/_providers/download";
import { ReactNode } from "react";
// import { ProjectManagerProvider } from "@/app/project/providers/project-manager";

import { styles } from ".";

export interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

interface ProjectsLayoutProps {
  children: ReactNode;
}

export default async function ProjectLayout({ children }: ProjectsLayoutProps) {
  // const loadedParams = await params;
  // const project

  // const { selectedProject, fetched, fetchedUser, notFound } =
  //   useFetchSelectedProject();
  // useProjectNotFoundRedirect(notFound);

  return (
    // <DownloadProvider>
    // <ProjectManagerProvider>
    <Section
      className={styles.background}
      extraClassName={styles.padding}
      fixed
      center
    >
      <div className={styles.card}>{children}</div>
    </Section>
    // </ProjectManagerProvider>
    // </DownloadProvider>
  );
}
