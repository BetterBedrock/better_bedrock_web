import { FeaturedCard } from "@/pages/downloads/ui/featured-card/featured-card";
import { ProjectsCard } from "@/pages/downloads/ui/projects-card/projects-card";
import { getCurrentPaginationPage } from "@/shared/lib/utils";

export interface BedrockScriptsPageProps {
  params: Promise<{ page?: string[] }>;
}

export const BedrockScriptsPage = async ({ params }: BedrockScriptsPageProps) => {
  const { page } = await params;
  const currentPage = getCurrentPaginationPage(page);

  return (
    <>
      {currentPage <= 1 && <FeaturedCard />}
      <ProjectsCard type="scripts" page={currentPage} />
    </>
  );
};
