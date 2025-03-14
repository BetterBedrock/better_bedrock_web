import React from "react";
import { BedrockText } from "components/bedrock/text";
import { Collapsible } from "components/bedrock/Collapsible";
import { Sections, ALL_SECTIONS } from "../../../pages/information/information"
import styles from "./faq.module.css";

interface FaqProps {
  activeTab: number;
}

export const Faq: React.FC<FaqProps> = ({ activeTab }) => {
  const activeSection: Sections = (activeTab < ALL_SECTIONS.length) ? ALL_SECTIONS[activeTab] : "general";
  const faqSection = QUESTIONS[activeSection];

  return (
    <div className={styles.faqSectionContainer}>
      <div style={{ paddingBottom: "1rem" }}>
        <BedrockText
          type={"h1"}
          text={"FAQ"}
          color="white"
          font="MinecraftTen"
        />
        <BedrockText type={"p"} color="white" text={faqSection.description} />
      </div>
      <div className={styles.questionsContainer}>
        {faqSection.items.map((question, index) => (
          <Collapsible
            key={question.question}
            headerText={question.question}
            contentText={question.answer}
            width={"100%"}
            indexTextRef={index + 1}
          />
        ))}
      </div>
    </div>
  );
};

interface FaqSection {
  description: string;
  items: { question: string; answer: string }[];
}

type Questions = {
  general: FaqSection;
  mobile: FaqSection;
  pc: FaqSection;
};

const QUESTIONS: Questions = {
  general: {
    description: "General topic FAQ. If you still have questions, please check out our discord server!",
    items: [
      {
        question: "Is Better Bedrock content safe?",
        answer:
          "DEFINITELY YES! Texture Pack doesn't need anything. Mobile Client requires permissions, but for editing minecraft files only. Windows clinet can be flagged as a virus, however it's safe. We only read minecraft memory and injecting features there. In all these products, we DO NOT collect any data from our users.",
      },
      {
        question: "How to Better Bedrock content?",
        answer:
          "Simply navigate to downloads page and click item you want to download!",
      },
      {
        question: `Why download process failed and there is error "We could not verify your session"`,
        answer:
          `It's due to several potential issues. Here are some possible reasons: 1. You used services such as bypass.city to skip the ads. 2. While downloading one file from our website, you clicked to begin another download - wait patiently. 3. You waited too long on the linkvertise page before clicking button "Get Better Bedrock" to redirect. 4. You changed your ip address (or used a VPN) while being on our site. 5. Your internet connection was too slow to send a request to our servers. Minimum download speed: ~0.33MB/s. 6. You have adblockers or any extensions blocking requests to our servers. (Browsers such as Brave, or Safari can also sometimes prevent requests)`,
      },
      {
        question: "What devices are supported by Better Bedrock?",
        answer:
          "Texture Pack is available for all devices that are able to import Texture Packs. Mobile Client is available for Android. Windows Client is available for Windows 10/11",
      },
      {
        question: "How to open Mod Menu?",
        answer: `Simply open pause menu and double click the "Mod Menu" button in bottom left corner.`,
      },
      {
        question: "Why are my Mod Menu options reset?",
        answer: "To save these options and adjust extra ones use config. Scroll down to Config section for more information.",
      },
      {
        question: "What is a subpack?",
        answer:
          `Subpack is minecraft name for texture pack options. To access it, open settings, go to "Global Resources", select "ACTIVE" tab, select Better Bedrock and then click gear icon in bottom right corner.`,
      },
      {
        question: "Where are tutorial videos?",
        answer: "Just scroll down a bit! And make sure to select proper option at the top for your topic.",
      },
      {
        question: "When will the new versions be released?",
        answer: "New content will be always announced on our discord server at #announcements. Make sure to join us to stay updated!",
      },
      {
        question: "Why my cape is not visible?",
        answer: `It has been issue for use since larger amount of modules used. At the moment this issue is still in BB v7.4 and in that and earlier versions you can use BB cape (add horizontaly 2 pixles in your skin image to bring that cape) In coming v7.5 we will fix this issue and render default cape that you choosen in "dressing room"`,
      },
      {
        question: "Can I become a helper on discord?",
        answer: "In short, we see no need for more helpers on our discord server. If we need more people, we will let you know at #announcements on our discord server.",
      },
    ],
  },
  mobile: {
    description: "Mobile devices FAQ. If you still have questions, please check out our discord server!",
    items: [
      {
        question: "Why can't I open Inventory Screen",
        answer: "This issue usually appears when pocket UI is used. We do not fully support this mode and we recommend using second one - the classic UI. To change it open sttings, navigate to video, scroll down until you see UI Profile option, then click and change to classic UI, problem should be resolved."
      },
    ],
  },
  pc: {
    description: "PC/Other devices FAQ. If you still have questions, please check out our discord server!",
    items: [
      {
        question: "(CONSOLE) How to change config on console.",
        answer:
          `There isn't any way to adjust config on consoles, because it requires editing txt pack files, but there is one way. In short, open "Mobile Devices" tab and search for "Edit config before importing pack" or #3 tutorial video. Follow this until you see part about zipping created folder. After that you need to put this created file firstly named something.zip and then something.mcpack to console files and open BB from here. Yes we know that it's slow process, but we still provide methods to use our pack on consoles. It's not stable but still possible. We recommend adjusting config on phone or console and then changing this on PC/Phone like on tutorial.`,
      },
      {
        question: "(Controller) Why is the Mod Menu key missing?",
        answer:
          `If you use pack without subpack option selected to "Controller Mode", then that's the reason. Enable this option and make sure to read important note about this mode - in short, controller input is really problematic and there isn't any way to make it work perfectly.`,
      },
      {
        question: "(Controller) Why is the Mod Menu visible in the background on container screens?",
        answer:
          `Container Screens means e.g. inventory screen or pause screen, it's just in background. It's common problem when using controller input and "Controller Mode" subpack. Again, controller input is really problematic and there isn't any way to make it work perfectly and that's why we recommend adjusting config and using other Modes to prevent this behavior.`,
      },
    ],
  },
};