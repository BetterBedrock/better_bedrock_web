import { FeaturedCard } from "./featured-card/featured-card";
import { ProjectsCard } from "./projects-card/projects-card";

export interface MainProps {
  params: Promise<{ page?: string[] }>;
}

export default async function Main({ params }: MainProps) {
  return (
    <>
      <FeaturedCard />
      <ProjectsCard params={params} />
    </>
  );
}
