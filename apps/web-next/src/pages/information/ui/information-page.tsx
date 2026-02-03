import { Header } from "@/pages/information/ui/header/header";
import { FAQ } from "@/pages/information/ui/faq/faq";
import { TutorialVideos } from "@/pages/information/ui/tutorial-videos/tutorial-videos";

import { informationData } from "@/pages/information/model/information-data";
import { redirect } from "next/navigation";
import { Routes } from "@/shared/lib/utils";

interface InformationPageProps {
  params: Promise<{ slug: string[] }>;
}

export const InformationPage = async ({ params }: InformationPageProps) => {
  const loadedParams = await params;
  const selectedCategory = informationData.find(
    (c) => c.id === loadedParams?.slug?.[0],
  );

  if (!selectedCategory) {
    redirect(`${Routes.INFORMATION}/${informationData[0].id}`);
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
