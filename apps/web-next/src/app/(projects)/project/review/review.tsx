import { fetchLoggedUser } from "@/lib/auth";
import { fetchDraftsDetails } from "@/lib/projects/fetch-draft-details";
import { CardPreview } from "@/app/(projects)/project/components/card-preview/card-preview";
import { Description } from "@/app/(projects)/project/components/description/description";
import { DownloadButton } from "@/app/(projects)/project/components/download-button/download-button";
import { Header } from "@/app/(projects)/project/components/header/header";
import { ProjectPageProps } from "@/app/(projects)/project/layout";
import { notFound } from "next/navigation";

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
