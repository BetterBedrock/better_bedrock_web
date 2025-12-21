import { fetchLoggedUser } from "@/lib/auth";
import { fetchProjectDetails } from "@/features/project/server/fetch-project-details";
import { Comments } from "@/features/project/components/comments/comments";
import { Description } from "@/features/project/components/description/description";
import { DownloadButton } from "@/features/project/components/download-button/download-button";
import { Header } from "@/features/project/components/header/header";
import { RateProject } from "@/features/project/components/rate-project/rate-project";
import { notFound } from "next/navigation";
import { ProjectPageProps } from "@/features/project/providers/project-manager";
import { baseFrontendUrl } from "@/utils/url";
import { capitalizeFirstLetter, extractFirstLinesFromTiptap, singularize } from "@/utils/string";

export const generateMetadata = async ({ params }: ProjectPageProps) => {
  const loadedParams = await params;
  const project = await fetchProjectDetails(loadedParams.id);

  if (!project) return notFound();

  const title = `${project.title} - ${capitalizeFirstLetter(singularize(project.type))}`;

  const description =
    extractFirstLinesFromTiptap(project.description) ??
    "The best texture packs, scripts, maps, skins, and more for Minecraft PE on Better Bedrock.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: `${baseFrontendUrl ?? ""}/${project.thumbnail}`,
    },
  };
};

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
