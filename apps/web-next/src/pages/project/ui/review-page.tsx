import { fetchDraftDetails } from "@/entities/project";
import { ProjectCardPreview } from "@/pages/project/ui/project-card-preview";
import { ProjectDescription } from "@/pages/project/ui/project-description";
import { notFound } from "next/navigation";
import { ProjectHeader } from "@/pages/project/ui/project-header";
import {
  ProjectPageProps,
  ProjectManagerProvider,
} from "@/app/providers/project-manager";
import { fetchLoggedUser } from "@/entities/auth";
import { ProjectDownload } from "./project-download/project-download";

export const metadata = {
  title: "Review Submitted Project",
  description: "Admin review page for submitted projects.",
};

export const ReviewPage = async ({ params }: ProjectPageProps) => {
  const loadedParams = await params;
  const user = await fetchLoggedUser();
  const project = await fetchDraftDetails(loadedParams.id);

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
