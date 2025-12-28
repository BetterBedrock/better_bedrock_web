import { fetchLoggedUser } from "@/lib/auth";
import { fetchProjectDetails } from "@/features/project/server/fetch-project-details";
import { Comments } from "@/features/project/components/comments/comments";
import { Description } from "@/features/project/components/description/description";
import { Header } from "@/features/project/components/header/header";
import { RateProject } from "@/features/project/components/rate-project/rate-project";
import { notFound } from "next/navigation";
import { ProjectPageProps } from "@/features/project/providers/project-manager";
import { baseUrl } from "@/utils/url";
import {
  capitalizeFirstLetter,
  extractFirstLinesFromTiptap,
  singularize,
} from "@/utils/string";
import { Download } from "@/features/project/components/download/download";

export const generateMetadata = async ({ params }: ProjectPageProps) => {
  const loadedParams = await params;
  const { data } = await fetchProjectDetails(loadedParams.id);

  if (!data) return notFound();

  const title = `${data.title} - ${capitalizeFirstLetter(singularize(data.type))}`;
  const description =
    extractFirstLinesFromTiptap(project.description) ??
    "The best texture packs, scripts, maps, skins, and more for Minecraft PE on Better Bedrock.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: `${baseUrl ?? ""}/${project.thumbnail}`,
    },
  };
};

export default async function Preview({ params }: ProjectPageProps) {
  const loadedParams = await params;
  const user = await fetchLoggedUser();
  const { data } = await fetchProjectDetails(loadedParams.id);

  if (!data) notFound();

  return (
    <>
      <Header mode="view" selectedProject={data} />
      <Description mode="view" detailedProject={data} />
      <Download detailedProject={data} user={user} />
      {user && <RateProject detailedProject={data} />}
      <Comments detailedProject={data} />
    </>
  );
}
