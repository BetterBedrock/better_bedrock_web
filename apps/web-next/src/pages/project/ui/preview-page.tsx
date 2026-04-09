import { fetchProjectDetails } from "@/entities/project";
import { ProjectComments } from "@/pages/project/ui/project-comments";
import { ProjectDescription } from "@/pages/project/ui/project-description";
import { ProjectHeader } from "@/pages/project/ui/project-header";
import { ProjectRateProject } from "@/pages/project/ui/project-rate-project";
import { notFound } from "next/navigation";
import {
  baseUrl,
  capitalizeFirstLetter,
  singularize,
} from "@/shared/lib/utils";
import { extractFirstLinesFromTiptap } from "@/shared/lib/utils";
import { ProjectDownload } from "./project-download/project-download";
import { ProjectPageProps } from "@/app/providers/project-manager";
import { fetchLoggedUser } from "@/entities/auth";
import { bedrockDownloadPages } from "@/shared/config";
import { DetailedProjectDto } from "@/shared/lib/openapi";
import dayjs from "dayjs";

interface ProjectJsonLdProps {
  project: DetailedProjectDto;
}

export const generateMetadata = async ({ params }: ProjectPageProps) => {
  const loadedParams = await params;
  const { data } = await fetchProjectDetails(loadedParams.id);

  if (!data) return notFound();

  const downloadPage = bedrockDownloadPages.find(
    (p) => p.details.type === data?.type,
  );

  const type = singularize(
    downloadPage
      ? downloadPage.details.clean
      : capitalizeFirstLetter(data.type),
  );

  const title = `${data.title} - Minecraft Bedrock ${type}`;
  const description =
    extractFirstLinesFromTiptap(data.description) ??
    "The best minecraft bedrock mods, texture packs, scripts, maps, skins, and more.";

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

const ProjectJsonLd = ({ project }: ProjectJsonLdProps) => {
  const { user, rating } = project;

  const image = baseUrl + "/" + project!.thumbnail;
  const description =
    extractFirstLinesFromTiptap(project.description) ??
    "The best minecraft bedrock mods, texture packs, scripts, maps, skins, and more.";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: description,
    image: image,
    url: `${baseUrl}/project/preview/${project.id}`,
    author: {
      "@type": "Person",
      name: user.name,
    },
    datePublished: dayjs(project.createdAt).toISOString(),
    ...(rating.count > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: rating.average.toString(),
        reviewCount: rating.count.toString(),
      },
    }),
    applicationCategory: "GameApplication",
    operatingSystem: "Windows, Android, iOS",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export const PreviewPage = async ({ params }: ProjectPageProps) => {
  const loadedParams = await params;
  const user = await fetchLoggedUser();
  const { data } = await fetchProjectDetails(loadedParams.id);

  if (!data) notFound();

  return (
    <>
      <ProjectJsonLd project={data} />

      <ProjectHeader mode="view" selectedProject={data} />
      <ProjectDescription mode="view" detailedProject={data} />
      <ProjectDownload detailedProject={data} user={user} />
      {user && <ProjectRateProject detailedProject={data} />}
      <ProjectComments detailedProject={data} />
    </>
  );
};
