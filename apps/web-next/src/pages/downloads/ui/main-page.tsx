import { FeaturedCard } from "@/pages/downloads/ui/featured-card/featured-card";
import { ProjectsCard } from "@/pages/downloads/ui/projects-card/projects-card";

export interface MainPageProps {
  params: Promise<{ page?: string[] }>;
}

export const MainPage = async ({ params }: MainPageProps) => (
  <>
    <FeaturedCard />
    {/* <ContentCard /> */}
    <ProjectsCard params={params} />
  </>
);
