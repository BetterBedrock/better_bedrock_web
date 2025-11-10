import { fetchLoggedUser } from "@/_lib/auth";
import { fetchProjectDetails } from "@/_lib/projects/fetch-project-details";
import { DownloadProvider } from "@/_providers/download";
import { Description } from "@/app/project/components";
import { Comments } from "@/app/project/components/comments";
import { DownloadButton } from "@/app/project/components/download-button";
import { Header } from "@/app/project/components/header";
import { RateProject } from "@/app/project/components/rate-project";
import { ProjectPageProps } from "@/app/project/layout";
import { ProjectManagerProvider } from "@/app/project/providers/project-manager";
import { notFound } from "next/navigation";

export default async function Preview({ params }: ProjectPageProps) {
  const loadedParams = await params;
  const user = await fetchLoggedUser();
  const project = await fetchProjectDetails(loadedParams.id);

  if (!project) notFound();

  return (
    <>
      <Header mode="view" selectedProject={project} />
      <ProjectManagerProvider detailedProject={project} user={user}>
        <Description mode="view" detailedProject={project} />{" "}
        <DownloadButton detailedProject={project} />
        {user && <RateProject detailedProject={project} />}
      </ProjectManagerProvider>

      <Comments detailedProject={project} />
    </>
  );
}
