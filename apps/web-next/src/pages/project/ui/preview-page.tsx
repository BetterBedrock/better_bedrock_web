import { fetchProjectDetails } from "@/entities/project";
import { ProjectComments } from "@/pages/project/ui/project-comments";
import { ProjectDescription } from "@/pages/project/ui/project-description";
import { ProjectHeader } from "@/pages/project/ui/project-header";
import { ProjectRateProject } from "@/pages/project/ui/project-rate-project";
import { notFound } from "next/navigation";
import { baseUrl } from "@/shared/lib/utils";
import {
  capitalizeFirstLetter,
  extractFirstLinesFromTiptap,
  singularize,
} from "@/shared/lib/utils";
import { ProjectDownload } from "./project-download/project-download";
import { ProjectPageProps } from "@/app/providers/project-manager";
import { fetchLoggedUser } from "@/entities/auth";

export const generateMetadata = async ({ params }: ProjectPageProps) => {
  const loadedParams = await params;
  const { data } = await fetchProjectDetails(loadedParams.id);

  if (!data) return notFound();

  const title = `${data.title} - ${capitalizeFirstLetter(singularize(data.type))}`;
  const description =
    extractFirstLinesFromTiptap(data.description) ??
    "The best texture packs, scripts, maps, skins, and more for Minecraft PE on Better Bedrock.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: `${baseUrl ?? ""}/${data.thumbnail}`,
    },
  };
};

export const PreviewPage = async ({ params }: ProjectPageProps) => {
  const loadedParams = await params;
  const user = await fetchLoggedUser();
  const { data } = await fetchProjectDetails(loadedParams.id);

  if (!data) notFound();

  return (
    <>
      <ProjectHeader mode="view" selectedProject={data} />
      <ProjectDescription mode="view" detailedProject={data} />
      <ProjectDownload detailedProject={data} user={user} />
      {user && <ProjectRateProject detailedProject={data} />}
      <ProjectComments detailedProject={data} />
    </>
  );
};
