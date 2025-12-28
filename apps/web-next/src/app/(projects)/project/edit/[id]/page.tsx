import { fetchLoggedUser } from "@/lib/auth";
import { fetchDraftsDetails } from "@/features/project/server/fetch-draft-details";
import { Actions } from "@/features/project/components/actions/actions";
import { Description } from "@/features/project/components/description/description";
import { DetailsEditor } from "@/features/project/components/details-editor/details-editor";
import { Header } from "@/features/project/components/header/header";
import { Thumbnail } from "@/features/project/components/thumbnail/thumbnail";
import {
  ProjectManagerProvider,
  ProjectPageProps,
} from "@/features/project/providers/project-manager";
import { notFound } from "next/navigation";
import { Download } from "@/features/project/components/download/download";

export const metadata = {
  title: "Edit Project",
  description:
    "Edit your Minecraft PE texture packs, scripts, maps, skins, and more on Better Bedrock.",
};

export default async function Edit({ params }: ProjectPageProps) {
  const loadedParams = await params;
  const user = await fetchLoggedUser();
  const project = await fetchDraftsDetails(loadedParams.id);

  if (!project || !user) {
    notFound();
  }

  return (
    <>
      <Header mode="edit" selectedProject={project} />
      <Download detailedProject={project} user={user} />

      <ProjectManagerProvider detailedProject={project}>
        <DetailsEditor detailedProject={project} user={user} />
        <Thumbnail detailedProject={project} />
        <Description mode="edit" detailedProject={project} />
        <Actions detailedProject={project} />
      </ProjectManagerProvider>
    </>
  );
}
