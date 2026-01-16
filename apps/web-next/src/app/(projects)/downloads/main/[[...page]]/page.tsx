import { ContentCard } from "@/features/project/components/content-card/content-card";
import { FeaturedCard } from "@/features/project/components/featured-card/featured-card";
import { ProjectsCard } from "@/features/project/components/projects-card/projects-card";

export interface MainProps {
  params: Promise<{ page?: string[] }>;
}

export default async function Main({ params }: MainProps) {
  return (
    <>
      <FeaturedCard />
      <ContentCard />
      <ProjectsCard params={params} />
    </>
  );
}
