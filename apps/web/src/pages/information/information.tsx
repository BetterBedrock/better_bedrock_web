import { useState } from "react";
import { Header } from "./components/header";
import { FAQ } from "./components/faq";
import { TutorialVideos } from "./components/tutorial-videos";
import { Section } from "~/components/section";
import { styles } from ".";
import { ButtonGroup } from "~/components/button-group/button-group";
import { Button } from "~/components/bedrock/button";
import { BedrockText } from "~/components/bedrock/bedrock-text";

export const Information = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [showDeprecated, setShowDeprecated] = useState(false);

  return (
    <main>
      <Section className={styles.background} extraClassName={styles.padding} fixed>
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        <FAQ activeTab={activeTab} />
        <TutorialVideos activeTab={activeTab} />
        {showDeprecated && (
          <TutorialVideos activeTab={activeTab} section="deprecated" />
        )}
        {activeTab === 0 && (
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
      </Section>
    </main>
  );
};

export type Sections = "general" | "mobile" | "pc";
export const ALL_SECTIONS: Sections[] = ["general", "mobile", "pc"];
