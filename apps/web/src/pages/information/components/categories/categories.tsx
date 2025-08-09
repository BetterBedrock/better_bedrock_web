import { useState } from "react";
import { useParams } from "react-router-dom";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";
import { ButtonGroup } from "~/components/button-group/button-group";
import { informationData } from "~/pages/information";
import { FAQ } from "~/pages/information/components/faq";
import { Header } from "~/pages/information/components/header";
import { TutorialVideos } from "~/pages/information/components/tutorial-videos";

export const Categories = () => {
  const [showDeprecated, setShowDeprecated] = useState(false);
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
        <TutorialVideos videos={selectedCategegory.videos} deprected={false} />
      )}
      {showDeprecated && selectedCategegory.deprectedVideos && (
        <TutorialVideos videos={selectedCategegory.deprectedVideos} deprected={true} />
      )}
      {selectedCategegory?.deprectedVideos && (
        <ButtonGroup>
          <Button
            type="green"
            width="100%"
            height="auto"
            onClick={() => setShowDeprecated((prev) => !prev)}
            center
          >
            <BedrockText
              type="p"
              color="white"
              text={showDeprecated ? "Close deprecated videos" : "Open deprecated videos"}
            />
          </Button>
        </ButtonGroup>
      )}
    </>
  );
};
