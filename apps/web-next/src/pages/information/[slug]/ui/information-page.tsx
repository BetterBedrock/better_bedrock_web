import { Header } from "@/pages/information/[slug]/ui/header/header";
import { FAQ } from "@/pages/information/[slug]/ui/faq/faq";
import { TutorialVideos } from "@/pages/information/[slug]/ui/tutorial-videos/tutorial-videos";

import { informationData } from "@/pages/information/[slug]/model/information-data";

interface InformationPageProps {
  params: Promise<{ slug: string }>;
}

export const InformationPage = async ({ params }: InformationPageProps) => {
  const loadedParams = await params;
  const selectedCategory = informationData.find(
    (c) => c.id === loadedParams.slug,
  );

  if (!selectedCategory) {
    return;
  }

  return (
    <>
      <Header selectedCategory={selectedCategory} />
      <FAQ selectedCategory={selectedCategory} />
      {selectedCategory.videos && (
        <TutorialVideos videos={selectedCategory.videos} />
      )}
    </>
  );
};
