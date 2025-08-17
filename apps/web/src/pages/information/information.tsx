import { useEffect } from "react";
import { Section } from "~/components/section";
import { styles } from ".";
import { Routes } from "~/utils/routes";
import { Outlet, useNavigate, useParams } from "react-router-dom";

export const Information = () => {
  const { category } = useParams();

  const navigate = useNavigate();

  if (!informationData[0]) {
    navigate(Routes.HOME);
  }

  if (!category) {
    navigate(Routes.INFORMATION + "/" + informationData[0].id);
  }

  useEffect(() => {
    if (!informationData.find((c) => c.id === category)) {
      navigate(Routes.INFORMATION + "/" + informationData[0].id);
    }
  }, [category]);

  return (
    <main>
      <Section className={styles.background} extraClassName={styles.padding} fixed>
        <Outlet />
      </Section>
    </main>
  );
};

interface VideoTag {
  id: string;
  name: string;
  color: string;
}

export interface InformationTab {
  id: string;
  name: string;
  faq: InformationFAQ;
  videos?: InformationVideos;
  deprectedVideos?: InformationVideos;
}

interface InformationFAQ {
  description: string;
  questions: InformationFAQQuestion[];
}

export interface InformationVideos {
  description: string;
  videos: InformationVideo[];
}

interface InformationFAQQuestion {
  question: string;
  answer: string;
}

export interface InformationVideo {
  title: string;
  description: string;
  link: string;
  tags?: string[];
}

export const tagData: VideoTag[] = [
  {
    id: "featured",
    name: "Featured",
    color: "rgb(255, 232, 102)",
  },
  {
    id: "deprected",
    name: "Deprected",
    color: "rgb(255, 63, 63)",
  },
  {
    id: "all-devices",
    name: "All Devices",
    color: "rgb(140, 179, 255)",
  },
  {
    id: "mobile",
    name: "Mobile",
    color: "rgb(140, 179, 255)",
  },
  {
    id: "pc",
    name: "PC",
    color: "rgb(140, 179, 255)",
  },
  {
    id: "console",
    name: "Console",
    color: "rgb(140, 179, 255)",
  },
  {
    id: "pc-console",
    name: "PC/Console",
    color: "rgb(140, 179, 255)",
  },
];

export const informationData: InformationTab[] = [
  {
    id: "general",
    name: "General",
    faq: {
      description: "General topic FAQ. If you still have questions, please check out our Discord server!",
      questions: [
        {
          question: "Are all Better Bedrock content safe?",
          answer: "DEFINITELY YES! The Texture Pack doesn't contain any harmful files or executables. We also DO NOT collect any data from our users. This project exists since 3 years and we never put here any malicious files or anything. You can track whole history on our discord or on youtube @axmbro. Here you will find all previous versions, starting with version 1, as proof of security and reputation!",
        },
        {
          question: "Is it available on the Marketplace?",
          answer: "No, and probably it will never be. The Texture Pack is available only on our website. We do not plan to publish it on the Marketplace, because it you wouldn't be able to adjust the config.",
        },
        {
          question: "Why you cannot just save config in game?",
          answer: "Unfortunately game doesn't provide any functions to change files and actually save mods states through UI. We are forced to manage it through config file, and adjusting it manually. There is no way to change it right now... That's also main reason why this pack won't be available on the Marketplace.",
        },
        {
          question: "Why do my Mod Menu options reset?",
          answer: "To save these options and adjust extra ones use config. Scroll down to Tutorials section and follow steps from here.",
        },
        {
          question: "What devices are supported by Better Bedrock?",
          answer: "The Texture Pack is available for all devices that are able to import Texture Packs.",
        },
        {
          question: "How do I open the Mod Menu?",
          answer: `Simply open the pause menu and double click the "Mod Menu" button in bottom left corner.`,
        },
        {
          question: "How do I download Better Bedrock content?",
          answer: "Simply navigate to downloads page and click item you want to download!",
        },
        {
          question: "Why I cannot see Mod Menu button?",
          answer: "It's because you probably use 'UI Mode with Mods', and therefore button is hidden and it's intentional. If you use controller input, then mod menu is only available to click in the 'Controler Mode'. Generally make sure to read the description of subpack options to understand how each mdoe work and what they do.",
        },
        {
          question: "Where are the tutorial videos?",
          answer: "Just scroll down a bit! And make sure to select proper option at the top for your topic.",
        },
        {
          question: `Why did the free download process fail?`,
          answer: `It's due to several potential issues. Here are some possible reasons: 1. You used bypass services to skip the ads. 2. While downloading one file from our website, you clicked to begin another download - wait patiently. 3. You waited too long on the linkvertise page before clicking button "Get Better Bedrock" to redirect. 4. You changed your ip address (or used a VPN) while being on our site. 5. Your internet connection was too slow to send a request to our servers. Minimum download speed: ~0.33MB/s. 6. You have adblockers or any extensions blocking requests to our servers. (Browsers such as Brave, or Safari can also sometimes prevent requests) 7. You have blocked popups so the download page cannot open.`,
        },
        {
          question: `Why doesn't the free download option work?`,
          answer: `You probably have blocked popups so the download page cannot open, we recommend to disable it or try using other download methods :3`,
        },
        {
          question: "What is a subpack?",
          answer: `A subpack is Minecraft name for texture pack options. To access it, open settings, go to "Global Resources", select "ACTIVE" tab, select Better Bedrock and then click gear icon in bottom right corner.`,
        },
        {
          question: "When will the new versions be released?",
          answer: "New content will be always announced on our Discord server at #announcements. Make sure to join us to stay updated!",
        },
        {
          question: "Can I become a helper on Discord?",
          answer: "In short, we see no need for more helpers on our Discord server. If we need more people, we will let you know at #announcements on our Discord server.",
        },
      ],
    },

    videos: {
      description: "List of general topic videos that explain the features and tools provided by Better Bedrock. TUTORIALS ARE DIFFERENT FOR EACH CATEGORY!",
      videos: [
        {
          title: "How to use waypoints",
          description: "Download extension pack and follow steps in pack description.",
          link: "https://youtu.be/HLJQOW-TkeU",
          tags: ["all-devices", "featured"],
        },
        {
          title: "Enable Controller Mode",
          description: "Use the subpack options to set the desired mode.",
          link: "https://youtu.be/1wpWo-kY8UE",
          tags: ["all-devices"],
        },
      ],
    },

    deprectedVideos: {
      description: "List of DEPRECATED videos for mobile devices designed to explain the features and tools that Better Bedrock provides. TUTORIALS ARE DIFFERENT FOR EACH CATEGORY!",
      videos: [
        {
          title: "Manually edit cape",
          description: "For the console only, you need to import skin to the game.",
          link: "https://youtu.be/nI-UxUOEgSU",
          tags: ["pc-console", "deprecated"],
        },
        {
          title: "Manually edit cape",
          description: "Everything is explained in video. All ways, tools etc.",
          link: "https://youtu.be/CCraMUpQX_Q",
          tags: ["mobile", "deprecated"],
        },
        {
          title: "Download and Install BB Mobile App",
          description: "Classic installation tutorial.",
          link: "https://youtu.be/3Rox3FRRo84",
          tags: ["mobile", "deprecated"],
        },
        {
          title: "Edit config in Mobile App",
          description: "Everything is explained in video.",
          link: "https://youtu.be/Pn-9RxvNFPM",
          tags: ["mobile", "deprecated"],
        },
        {
          title: "Edit cape in Mobile App",
          description: "Everything is explained in video.",
          link: "https://youtu.be/t0d4_LuDPEs",
          tags: ["mobile", "deprecated"],
        },
      ],
    },
  },

  {
    id: "mobile",
    name: "Mobile Devices",
    faq: {
      description: "Mobile devices FAQ. If you still have questions, please check out our Discord server!",
      questions: [
        {
          question: "Why can't I open Inventory Screen",
          answer: "This issue usually appears when pocket UI is used. We do not fully support this mode and we recommend using second one - the classic UI. To change it open sttings, navigate to video, scroll down until you see UI Profile option, then click and change to classic UI, problem should be resolved.",
        },
        {
          question: "Why are hearts not visible?",
          answer: "We do not support pocket UI, please change it to classic UI",
        },
      ],
    },

    videos: {
      description: "List of videos for mobile devices designed to explain the features and tools that Better Bedrock provides. TUTORIALS ARE DIFFERENT FOR EACH CATEGORY!",
      videos: [
        {
          title: "Download and Import Texture Pack to Minecraft",
          description: "Classic installation tutorial.",
          link: "https://youtu.be/dOTW4ffn9rA",
          tags: ["mobile"],
        },
        {
          title: "Manually edit config",
          description: "Everything is explained in video. All ways, tools etc.",
          link: "https://youtu.be/rPNfW_swUp4",
          tags: ["mobile", "featured"],
        },
        {
          title: "Edit config before importing pack",
          description: "It's optional way to save config - may be used to import pack to console.",
          link: "https://youtu.be/OIuGRJk_rbA",
          tags: ["mobile", "featured"],
        },
      ],
    },
  },

  {
    id: "other",
    name: "PC/Other Devices",
    faq: {
      description: "PC/Other devices FAQ. If you still have questions, please check out our Discord server!",
      questions: [
        {
          question: "(CONSOLE) How to download packs on console.",
          answer: `At the beginning XBOX is more flexible than PS, so playstation may be more limited and less accessible. For xbox, open browser, search for this website, download pack and try to import it, or just transfer packs from other device to xbox and through files either run it by minecraft or put in files. If this won't help, then I we recommend to check out this tutorial: https://youtu.be/cHkiufOsRrY`,
        },
        {
          question: "(CONSOLE) How to change config on console.",
          answer: `There isn't any way to adjust config on consoles, because it requires editing txt pack files, but there is one way. In short, open "Mobile Devices" tab and search for "Edit config before importing pack" or #3 tutorial video. Follow this until you see part about zipping created folder. After that you need to put this created file, firstly named something.zip and then something.mcpack, to console files and open BB from here. Yes we know that it's slow process, but we still provide methods to use our pack on consoles. We recommend adjusting config on phone or console and then changing this on PC/Phone like on tutorial.`,
        },
        {
          question: "(Controller) Why is the Mod Menu button missing?",
          answer: `If you use pack without subpack option selected to "Controller Mode", then that's the reason. Enable this option and make sure to read important note about this mode - in short, controller input is really problematic and there isn't any way to make it work perfectly.`,
        },
        {
          question: "(Controller) Why is the Mod Menu visible in the background on container screens?",
          answer: `Container Screens means e.g. inventory screen or pause screen, it's just in background and It's common problem when using controller input and "Controller Mode" subpack. Again, controller input is really problematic and there isn't any way to make it work perfectly and that's why we recommend adjusting config and using other Modes to prevent this behavior.`,
        },
      ],
    },

    videos: {
      description: "List of videos for PC/Other devices designed to explain the features and tools that Better Bedrock provides. TUTORIALS ARE DIFFERENT FOR EACH CATEGORY!",
      videos: [
        {
          title: "Download and Import Texture Pack to Minecraft",
          description: "Classic installation tutorial.",
          link: "https://youtu.be/QV67l-vrlSI",
          tags: ["pc"],
        },
        {
          title: "Manually edit config",
          description: "For the console only, you need to import this config to the game.",
          link: "https://youtu.be/QG9vJq6UPGA",
          tags: ["pc-console", "featured"],
        },
        {
          title: "How to set up autosprint",
          description:
            "Simple bind change that works on PC, but may not work on the console - not tested",
          link: "https://youtu.be/O3D6bNQW-Lc",
          tags: ["pc"],
        },
        {
          title: "How to create custom theme",
          description: "More complex tutorial about all theme customization available in BB.",
          link: "https://youtu.be/GRQahMrdEoY",
          tags: ["pc"],
        },
      ],
    },
  },
];