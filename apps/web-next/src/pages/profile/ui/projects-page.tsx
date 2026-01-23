import { Banner } from "@/shared/ui/banner";
import { GridDownloadCardList } from "@/shared/ui/grid-download-card-list";
import { loadProfileProjectsPageData } from "../api/load-profile-projects-page-data";

interface ProjectsPageProps {
  params?: Promise<{ name: string }>;
}

export const ProjectsPage = async ({ params }: ProjectsPageProps) => {
  const projects = await loadProfileProjectsPageData(params);

  if (projects.length < 1) {
    return <Banner type="neutral" message="No public projects available" />;
  }

  return <GridDownloadCardList projects={projects} />;
};
