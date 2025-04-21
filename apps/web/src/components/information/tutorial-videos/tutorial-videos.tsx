import React from "react";
import { BedrockText } from "~/components/bedrock/text";
import { GridCard } from "~/components/bedrock/grid-card/grid-card";
import { Sections, ALL_SECTIONS } from "../../../pages/information/information"
import styles from "./tutorial-videos.module.css";

interface TutorialVideosProps {
  activeTab: number;
  section?: "default" | "deprecated"
}

export const TutorialVideos: React.FC<TutorialVideosProps> = ({ activeTab, section = "default" }) => {
  const activeSection: Sections = (activeTab < ALL_SECTIONS.length) ? ALL_SECTIONS[activeTab] : "general";
  const tutorialSection = TUTORIALS[activeSection];
  const deprecatedTutorialSection = TUTORIALS[`${activeSection}Deprecated`];

  return (
    <>
      {(section === "default" || (section === "deprecated" && deprecatedTutorialSection)) && (<div>
        <div style={{ padding: "2rem 0 1rem 0" }}>
          <BedrockText
            type={"h1"}
            text={section === "default" ? "Tutorial Videos" : "Deprecated Tutorial Videos"}
            color="white"
            font="MinecraftTen"
          />
          <BedrockText type={"p"} color="white" text={section === "default" ? tutorialSection.description : deprecatedTutorialSection?.description || "Not available."} />
        </div>
        <div className={styles.gridCardsContainer}>
          {(section === "default" ? tutorialSection : deprecatedTutorialSection ?? { items: [] }).items.map((tutorial, index) => (
            <GridCard
              key={tutorial.title}
              index={index + 1}
              title={tutorial.title}
              description={tutorial.description}
              link={tutorial.link}
            />
          ))}
        </div>
      </div>)}
    </>
  );
};


interface TutorialSection {
  description: string;
  items: { title: string; description: string; link: string }[];
}

type Tutorials = {
  general: TutorialSection;
  mobile: TutorialSection;
  pc: TutorialSection;
  generalDeprecated?: TutorialSection;
  mobileDeprecated?: TutorialSection;
  pcDeprecated?: TutorialSection;
};

const TUTORIALS: Tutorials = {
  general: {
    description: "List of general topic videos that explain the features and tools provided by Better Bedrock. TUTORIALS ARE DIFFERENT FOR EACH CATEGORY!",
    items: [
      { title: "Enable Controller Mode", description: "Use the subpack options to set the desired mode.", link: "https://youtu.be/1wpWo-kY8UE" },
      { title: "How to use waypoints", description: "Download extension pack and follow steps in pack description.", link: "https://youtu.be/HLJQOW-TkeU" },
    ],
  },
  mobile: {
    description: "List of videos for mobile devices designed to explain the features and tools that Better Bedrock provides. TUTORIALS ARE DIFFERENT FOR EACH CATEGORY!",
    items: [
      { title: "Download and Import Texture Pack to Minecraft", description: "Classic installation tutorial.", link: "https://youtu.be/dOTW4ffn9rA" },
      { title: "Manually edit config", description: "Everything is explained in video. All ways, tools etc.", link: "https://youtu.be/rPNfW_swUp4" },
      { title: "Edit config before importing pack", description: "It's optional way to save config - may be used to import pack to console.", link: "https://youtu.be/OIuGRJk_rbA" },
      { title: "Manually edit cape", description: "Everything is explained in video. All ways, tools etc.", link: "https://youtu.be/CCraMUpQX_Q" },
    ],
  },
  pc: {
    description: "List of videos for PC/Other devices designed to explain the features and tools that Better Bedrock provides. TUTORIALS ARE DIFFERENT FOR EACH CATEGORY!",
    items: [
      { title: "Download and Import Texture Pack to Minecraft", description: "(PC) Classic installation tutorial.", link: "https://youtu.be/QV67l-vrlSI" },
      { title: "Manually edit config", description: "(PC/CONSOLE) For the console only, you need to import this config to the game.", link: "https://youtu.be/QG9vJq6UPGA" },
      { title: "Manually edit cape", description: "(PC/CONSOLE) For the console only, you need to import skin to the game.", link: "https://youtu.be/nI-UxUOEgSU" },
      { title: "How to set up autosprint", description: "(PC/CONSOLE) Simple bind change that works on PC, but may not work on the console - not tested", link: "https://youtu.be/O3D6bNQW-Lc" },
      { title: "How to create custom theme", description: "(PC) More complex tutorial about all theme customization available in BB.", link: "https://youtu.be/GRQahMrdEoY" },
    ],
  },
  mobileDeprecated: {
    description: "List of DEPRECATED videos for mobile devices designed to explain the features and tools that Better Bedrock provides. TUTORIALS ARE DIFFERENT FOR EACH CATEGORY!",
    items: [
      { title: "Download and Install BB Mobile App", description: "Classic installation tutorial.", link: "https://youtu.be/3Rox3FRRo84" },
      { title: "Edit config in Mobile App", description: "Everything is explained in video.", link: "https://youtu.be/Pn-9RxvNFPM" },
      { title: "Edit cape in Mobile App", description: "Everything is explained in video.", link: "https://youtu.be/t0d4_LuDPEs" },
    ],
  },
};