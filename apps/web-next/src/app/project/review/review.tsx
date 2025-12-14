import { fetchLoggedUser } from "@/_lib/auth";
import { fetchDraftsDetails } from "@/_lib/projects/fetch-draft-details";
import { CardPreview } from "@/app/project/components/card-preview";
import { DownloadButton } from "@/app/project/components/download-button";
import { notFound } from "next/navigation";
import { ProjectPageProps } from "@/app/project";
import { Description } from "@/app/project/components/description";
import { Header } from "@/app/project/components/header";

export const metadata = {
  title: "Review Submitted Project",
  description:
    "Admin review page for submitted projects.",
};

export default async function Review({ params }: ProjectPageProps) {
  const loadedParams = await params;
  const user = await fetchLoggedUser();
  const project = await fetchDraftsDetails(loadedParams.id);

  if (!project || !user || !user.admin || !project.submitted) {
    notFound();
  }

  return (
    <>
      <Header mode="view" selectedProject={project} />
      <Description mode="view" detailedProject={project} />
      <DownloadButton detailedProject={project} />
      <CardPreview />
    </>
  );
}
