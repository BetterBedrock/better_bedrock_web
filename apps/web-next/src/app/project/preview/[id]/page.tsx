import { fetchLoggedUser } from "@/_lib/auth";
import { fetchProjectDetails } from "@/_lib/projects/fetch-project-details";
import { Comments } from "@/app/project/components/comments/comments";
import { Description } from "@/app/project/components/description/description";
import { DownloadButton } from "@/app/project/components/download-button/download-button";
import { Header } from "@/app/project/components/header/header";
import { RateProject } from "@/app/project/components/rate-project/rate-project";
import { ProjectPageProps } from "@/app/project/layout";
import { notFound } from "next/navigation";

export const generateMetadata = async ({ params }: ProjectPageProps) => {
  const loadedParams = await params;
  const project = await fetchProjectDetails(loadedParams.id);

  if (!project) return notFound();

  return {
    title: project.title,
    description:
      project.description ??
      "The best texture packs, scripts, maps, skins, and more for Minecraft PE on Better Bedrock.",
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.thumbnail,
    },
  };
}

export default async function Preview({ params }: ProjectPageProps) {
  const loadedParams = await params;
  const user = await fetchLoggedUser();
  const project = await fetchProjectDetails(loadedParams.id);

  if (!project) notFound();

  return (
    <>
      <Header mode="view" selectedProject={project} />
      <Description mode="view" detailedProject={project} />
      <DownloadButton detailedProject={project} user={user} />
      {user && <RateProject detailedProject={project} />}
      <Comments detailedProject={project} />
    </>
  );
}
