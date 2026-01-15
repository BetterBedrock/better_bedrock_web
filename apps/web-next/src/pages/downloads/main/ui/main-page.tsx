import { FeaturedCard } from "@/pages/downloads/main/ui/featured-card/featured-card";
import { ProjectsCard } from "@/pages/downloads/main/ui/projects-card/projects-card";

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
