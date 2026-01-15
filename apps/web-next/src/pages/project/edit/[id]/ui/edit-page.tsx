import { fetchLoggedUser } from "@/lib/auth";
import { fetchDraftsDetails } from "@/entities/project/api/fetch-draft-details";
import { ProjectActions } from "@/widgets/project-actions/ui/project-actions";
import { ProjectDescription } from "@/widgets/project-description/ui/project-description";
import { ProjectDetailsEditor } from "@/widgets/project-details-editor/ui/project-details-editor";
import { ProjectHeader } from "@/widgets/project-header/ui/project-header";
import { ProjectThumbnail } from "@/widgets/project-thumbnail/ui/project-thumbnail";
import {
  ProjectManagerProvider,
  ProjectPageProps,
} from "@/shared/model/project-manager";
import { notFound } from "next/navigation";
import { ProjectDownload } from "@/widgets/project-download/ui/project-download";

export const metadata = {
  title: "Edit Project",
  description:
    "Edit your Minecraft PE texture packs, scripts, maps, skins, and more on Better Bedrock.",
};

export const EditPage = async ({ params }: ProjectPageProps) => {
  const loadedParams = await params;
  const user = await fetchLoggedUser();
  const project = await fetchDraftsDetails(loadedParams.id);

  if (!project || !user) {
    notFound();
  }

  return (
    <>
      <ProjectHeader mode="edit" selectedProject={project} />
      <ProjectDownload detailedProject={project} user={user} />

      <ProjectManagerProvider detailedProject={project}>
        <ProjectDetailsEditor detailedProject={project} user={user} />
        <ProjectThumbnail detailedProject={project} />
        <ProjectDescription mode="edit" detailedProject={project} />
        <ProjectActions detailedProject={project} />
      </ProjectManagerProvider>
    </>
  );
};
