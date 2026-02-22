import { FeaturedCard } from "@/pages/downloads/ui/featured-card/featured-card";
import { ProjectsCard } from "@/pages/downloads/ui/projects-card/projects-card";

export interface BedrockModsProps {
  params: Promise<{ page?: string[] }>;
}

export const BedrockModsPage = async ({ params }: BedrockModsProps) => (
  <>
    <FeaturedCard />
    {/* <ContentCard /> */}
    <ProjectsCard params={params} />
  </>
);
