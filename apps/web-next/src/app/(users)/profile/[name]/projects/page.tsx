import { Banner } from "@/components/banner";
import { GridDownloadCardList } from "@/components/grid-download-card-list/grid-download-card-list";
import { loadProfileProjectsPageData } from "@/features/project/server/load-profile-projects-page-data";

interface ProjectsProps {
  params?: Promise<{ name: string }>;
}

export default async function Projects({ params }: ProjectsProps) {
  const projects = await loadProfileProjectsPageData(params);

  if (projects.length < 1) {
    return <Banner type="neutral" message="No public projects available" />;
  }

  return <GridDownloadCardList projects={projects} />;
}
