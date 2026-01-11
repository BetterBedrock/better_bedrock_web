import { Header } from "@/features/information/components/header/header";
import { FAQ } from "@/features/information/components/faq/faq";
import { TutorialVideos } from "@/features/information/components/tutorial-videos/tutorial-videos";

import { informationData } from "@/features/information/data/information-data";
import { PartnerCard } from "@/components/partner-card";

interface CategoriesProps {
  params: Promise<{ slug: string }>;
}

export default async function Categories({ params }: CategoriesProps) {
  const loadedParams = await params;
  const selectedCategory = informationData.find(
    (c) => c.id === loadedParams.slug
  );

  if (!selectedCategory) {
    return;
  }

  return (
    <>
      <PartnerCard onlyImage/>
      <Header selectedCategory={selectedCategory} />
      <FAQ selectedCategory={selectedCategory} />
      {selectedCategory.videos && (
        <TutorialVideos videos={selectedCategory.videos} />
      )}
    </>
  );
}
