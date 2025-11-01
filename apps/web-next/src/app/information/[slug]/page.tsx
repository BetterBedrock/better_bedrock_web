import { informationData } from "@/app/information/[slug]";
import { FAQ } from "@/app/information/[slug]/components/faq";
import { Header } from "@/app/information/[slug]/components/header";
import { TutorialVideos } from "@/app/information/[slug]/components/tutorial-videos";

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
