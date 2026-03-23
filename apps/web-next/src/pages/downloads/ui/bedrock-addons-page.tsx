import { FeaturedCard } from "@/pages/downloads/ui/featured-card/featured-card";
import { ProjectsCard } from "@/pages/downloads/ui/projects-card/projects-card";
import { getCurrentPaginationPage } from "@/shared/lib/utils";

export interface BedrockAddonsPageProps {
  params: Promise<{ page?: string[] }>;
}

export const BedrockAddonsPage = async ({ params }: BedrockAddonsPageProps) => {
  const { page } = await params;
  const currentPage = getCurrentPaginationPage(page);

  return (
    <>
      {currentPage <= 1 && <FeaturedCard />}
      <ProjectsCard type="addons" page={currentPage} />
    </>
  );
};
