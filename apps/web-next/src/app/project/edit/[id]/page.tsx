import { fetchLoggedUser } from "@/_lib/auth";
import { fetchDraftsDetails } from "@/_lib/projects/fetch-draft-details";
import { fetchProjectDetails } from "@/_lib/projects/fetch-project-details";
import { DownloadProvider } from "@/_providers/download";
import { ProjectPageProps } from "@/app/project";
import { Header, Description, Actions } from "@/app/project/components";
import { DetailsEditor } from "@/app/project/components/details-editor";
import { DownloadButton } from "@/app/project/components/download-button";
import { Thumbnail } from "@/app/project/components/thumbnail";
import { ProjectManagerProvider } from "@/app/project/providers/project-manager";
import { notFound } from "next/navigation";

export default async function Edit({ params }: ProjectPageProps) {
  const loadedParams = await params;
  const user = await fetchLoggedUser();
  const project = await fetchDraftsDetails(loadedParams.id);

  if (!project || !user) {
    notFound();
  }

  return (
    <>
      <Header mode="edit" selectedProject={project} />
      <DownloadButton detailedProject={project} user={user} />

      <ProjectManagerProvider detailedProject={project}>
        <DetailsEditor detailedProject={project} user={user} />
        <Thumbnail detailedProject={project} />
        <Description mode="edit" detailedProject={project} />
        <Actions detailedProject={project} />
      </ProjectManagerProvider>
    </>
  );
}
