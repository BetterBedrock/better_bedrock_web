import { useParams } from "react-router-dom";
import { informationData } from "~/pages/information";
import { FAQ } from "~/pages/information/components/faq";
import { Header } from "~/pages/information/components/header";
import { TutorialVideos } from "~/pages/information/components/tutorial-videos";

export const Categories = () => {
  const { category } = useParams();
  const selectedCategegory = informationData.find((c) => c.id === category);

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
};
