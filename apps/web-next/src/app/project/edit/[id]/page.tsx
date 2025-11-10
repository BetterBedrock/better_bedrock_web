import { fetchLoggedUser } from "@/_lib/auth";
import { fetchProjectDetails } from "@/_lib/projects/fetch-project-details";
import { DownloadProvider } from "@/_providers/download";
import { ProjectPageProps } from "@/app/project";
import { Header, Description, Actions } from "@/app/project/components";
import { DownloadButton } from "@/app/project/components/download-button";
import { Thumbnail } from "@/app/project/components/thumbnail";
import { ProjectManagerProvider } from "@/app/project/providers/project-manager";
import { notFound } from "next/navigation";

export default async function Edit({ params }: ProjectPageProps) {
  const loadedParams = await params;
  const user = await fetchLoggedUser();
  const project = await fetchProjectDetails(loadedParams.id);

  const hasAccess = user?.admin || user?.id === project?.userId;

  if (!hasAccess || !project) {
    notFound();
  }

  return (
    <>
      <Header mode="edit" selectedProject={project} />

      {/* <DetailsEditor /> */}

      <ProjectManagerProvider detailedProject={project}>
        <DownloadButton detailedProject={project} user={user}/>
        <Thumbnail detailedProject={project} />
        <Description mode="edit" detailedProject={project} />
      </ProjectManagerProvider>
      {/* <Actions /> */}
    </>
  );
}
