import { fetchDraftDetails } from "@/entities/project";
import { ProjectActions } from "@/pages/project/ui/project-actions";
import { ProjectDescription } from "@/pages/project/ui/project-description";
import { ProjectDetailsEditor } from "@/pages/project/ui/project-details-editor";
import { ProjectHeader } from "@/pages/project/ui/project-header";
import { ProjectThumbnail } from "@/pages/project/ui/project-thumbnail";
import { notFound } from "next/navigation";
import { ProjectDownload } from "./project-download/project-download";
import {
  ProjectPageProps,
  ProjectManagerProvider,
} from "@/app/providers/project-manager";
import { fetchLoggedUser } from "@/entities/auth";

export const metadata = {
  title: "Edit Project",
  description:
    "Edit your Minecraft PE texture packs, scripts, maps, skins, and more on Better Bedrock.",
};

export const EditPage = async ({ params }: ProjectPageProps) => {
  const loadedParams = await params;
  const user = await fetchLoggedUser();
  const project = await fetchDraftDetails(loadedParams.id);

  if (!project || !user) {
    notFound();
  }

  return (
    <>
      <ProjectHeader mode="edit" selectedProject={project} />
      <ProjectDownload detailedProject={project} user={user} hideExtraButtons={true} />
      <ProjectManagerProvider detailedProject={project}>
        <ProjectDetailsEditor detailedProject={project} user={user} />
        <ProjectThumbnail detailedProject={project} />
        <ProjectDescription mode="edit" detailedProject={project} />
        <ProjectActions detailedProject={project} />
      </ProjectManagerProvider>
    </>
  );
};
