import { FAQ } from "@/features/information/components/faq/faq";
import { Header } from "@/features/information/components/header/header";
import { TutorialVideos } from "@/features/information/components/tutorial-videos/tutorial-videos";

import { informationData } from "@/features/information/data/information-data";

interface CategoriesProps {
  params: Promise<{ slug: string }>;
}

export default async function Categories({ params }: CategoriesProps) {
  // useVerifyExistingInfo();
  const loadedParams = await params;
  const selectedCategegory = informationData.find(
    (c) => c.id === loadedParams.slug
  );

  if (!selectedCategegory) {
    return;
  }

  return (
    <>
      <Header selectedCategory={selectedCategegory} />
      <FAQ selectedCategory={selectedCategegory} />
      {selectedCategegory.videos && (
        <TutorialVideos videos={selectedCategegory.videos} />
      )}
    </>
  );
}
