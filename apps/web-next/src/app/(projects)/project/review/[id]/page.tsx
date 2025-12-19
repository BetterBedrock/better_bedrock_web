import { fetchLoggedUser } from "@/lib/auth";
import { fetchDraftsDetails } from "@/features/project/server/fetch-draft-details";
import { CardPreview } from "@/features/project/components/card-preview/card-preview";
import { Description } from "@/features/project/components/description/description";
import { DownloadButton } from "@/features/project/components/download-button/download-button";
import { Header } from "@/features/project/components/header/header";
import { notFound } from "next/navigation";
import { ProjectPageProps } from "@/features/project/providers/project-manager";

export const metadata = {
  title: "Review Submitted Project",
  description: "Admin review page for submitted projects.",
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
