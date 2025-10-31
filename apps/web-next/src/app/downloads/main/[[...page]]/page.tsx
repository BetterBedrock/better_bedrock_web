"use server";

import { ProjectType, SearchOrder } from "@/_lib/api";
import { FeaturedCard } from "@/app/downloads/main/[[...page]]/featured-card";
import { ProjectsCard } from "@/app/downloads/main/[[...page]]/projects-card";

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
