import { useState } from "react";
import { Header } from "./components/header";
import { FAQ } from "./components/faq";
import { TutorialVideos } from "./components/tutorial-videos";
import { Section } from "~/components/section";
import { styles } from ".";

export const Information = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <main>
      <Section className={styles.background} fixed>
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        <FAQ activeTab={activeTab} />
        <TutorialVideos activeTab={activeTab} />
        <TutorialVideos activeTab={activeTab} section="deprecated" />
      </Section>
    </main>
  );
};

export type Sections = "general" | "mobile" | "pc";
export const ALL_SECTIONS: Sections[] = ["general", "mobile", "pc"];
