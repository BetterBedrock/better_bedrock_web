import { FAQ } from ".//components/faq/faq";
import { Header } from ".//components/header/header";
import { TutorialVideos } from ".//components/tutorial-videos/tutorial-videos";

import { informationData } from "./data/information-data";

interface CategoriesProps {
  params: Promise<{ slug: string }>;
}

export default async function Categories({ params }: CategoriesProps) {
  // useVerifyExistingInfo();
  const loadedParams = await params;
  const selectedCategegory = informationData.find((c) => c.id === loadedParams.slug);

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
