import { fetchLoggedUser } from "@/lib/auth";
import { fetchProjectDetails } from "@/entities/project/api/fetch-project-details";
import { ProjectComments } from "@/widgets/project-comments/ui/project-comments";
import { ProjectDescription } from "@/widgets/project-description/ui/project-description";
import { ProjectHeader } from "@/widgets/project-header/ui/project-header";
import { ProjectRateProject } from "@/widgets/project-rate-project/ui/project-rate-project";
import { notFound } from "next/navigation";
import { ProjectPageProps } from "@/shared/model/project-manager";
import { baseUrl } from "@/shared/lib/url";
import {
  capitalizeFirstLetter,
  extractFirstLinesFromTiptap,
  singularize,
} from "@/shared/lib/string";
import { ProjectDownload } from "@/widgets/project-download/ui/project-download";

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
