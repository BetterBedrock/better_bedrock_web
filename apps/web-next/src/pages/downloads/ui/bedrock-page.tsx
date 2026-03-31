import { FeaturedCard } from "@/pages/downloads/ui/featured-card/featured-card";
import { ProjectsCard } from "@/pages/downloads/ui/projects-card/projects-card";
import { bedrockDownloadPages } from "@/shared/config";
import { SearchOrder } from "@/shared/lib/openapi";
import { notFound } from "next/navigation";

export interface BedrockPageProps {
  params: Promise<{ type?: string }>;
  searchParams: Promise<{ page: string; o: string; s: string }>;
}

export const BedrockPage = async ({
  params,
  searchParams,
}: BedrockPageProps) => {
  const { type } = await params;
  const loadedSearchParams = await searchParams;

  const order =
    SearchOrder[loadedSearchParams.o as keyof typeof SearchOrder] ||
    SearchOrder.Newest;
  const search = loadedSearchParams.s;

  const downloadPage = bedrockDownloadPages.find((p) => p.details.url === type);

  if (!downloadPage) {
    notFound();
  }

  const currentPage = Number(loadedSearchParams.page) || 1;

  return (
    <>
      {currentPage <= 1 && <FeaturedCard />}
      <ProjectsCard type={downloadPage?.details.type} page={currentPage} order={order} search={search}/>
    </>
  );
};
