import { Header } from "@/pages/information/ui/header/header";
import { FAQ } from "@/pages/information/ui/faq/faq";
import { TutorialVideos } from "@/pages/information/ui/tutorial-videos/tutorial-videos";

import { informationData } from "@/pages/information/model/information-data";

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
