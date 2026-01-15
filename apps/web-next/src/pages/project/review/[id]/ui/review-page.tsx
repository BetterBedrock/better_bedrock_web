import { fetchLoggedUser } from "@/lib/auth";
import { fetchDraftsDetails } from "@/entities/project/api/fetch-draft-details";
import { ProjectCardPreview } from "@/widgets/project-card-preview/ui/project-card-preview";
import { ProjectDescription } from "@/widgets/project-description/ui/project-description";
import { notFound } from "next/navigation";
import {
  ProjectManagerProvider,
  ProjectPageProps,
} from "@/shared/model/project-manager";
import { ProjectDownload } from "@/widgets/project-download/ui/project-download";
import { ProjectHeader } from "@/widgets/project-header/ui/project-header";

export const metadata = {
  title: "Review Submitted Project",
  description: "Admin review page for submitted projects.",
};

export const ReviewPage = async ({ params }: ProjectPageProps) => {
  const loadedParams = await params;
  const user = await fetchLoggedUser();
  const project = await fetchDraftsDetails(loadedParams.id);

  if (!project || !user || !user.admin || !project.submitted) {
    notFound();
  }

  return (
    <>
      <ProjectHeader mode="view" selectedProject={project} />
      <ProjectDescription mode="view" detailedProject={project} />
      <ProjectDownload detailedProject={project} />
      <ProjectManagerProvider detailedProject={project}>
        <ProjectCardPreview />
      </ProjectManagerProvider>
    </>
  );
};
