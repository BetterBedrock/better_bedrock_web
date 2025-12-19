import { fetchLoggedUser } from "@/lib/auth";
import { fetchDraftsDetails } from "@/lib/projects/fetch-draft-details";
import { Actions } from "@/app/(projects)/project/components/actions/actions";
import { Description } from "@/app/(projects)/project/components/description/description";
import { DetailsEditor } from "@/app/(projects)/project/components/details-editor/details-editor";
import { DownloadButton } from "@/app/(projects)/project/components/download-button/download-button";
import { Header } from "@/app/(projects)/project/components/header/header";
import { Thumbnail } from "@/app/(projects)/project/components/thumbnail/thumbnail";
import { ProjectPageProps } from "@/app/(projects)/project/layout";
import { ProjectManagerProvider } from "@/app/(projects)/project/providers/project-manager";
import { notFound } from "next/navigation";

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
      <DownloadButton detailedProject={project} user={user} />

      <ProjectManagerProvider detailedProject={project}>
        <DetailsEditor detailedProject={project} user={user} />
        <Thumbnail detailedProject={project} />
        <Description mode="edit" detailedProject={project} />
        <Actions detailedProject={project} />
      </ProjectManagerProvider>
    </>
  );
}
