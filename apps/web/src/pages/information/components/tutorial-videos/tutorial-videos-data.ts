import { TagsTypes } from "~/components/bedrock/grid-card/grid-card";

export interface TutorialSection {
  description: string;
  items: { title: string; description: string; link: string; tags?: TagsTypes[] }[];
}

type Tutorials = {
  general: TutorialSection;
  mobile: TutorialSection;
  pc: TutorialSection;
  generalDeprecated?: TutorialSection;
  mobileDeprecated?: TutorialSection;
  pcDeprecated?: TutorialSection;
};

export const TUTORIALS: Tutorials = {
  general: {
    description:
      "List of general topic videos that explain the features and tools provided by Better Bedrock. TUTORIALS ARE DIFFERENT FOR EACH CATEGORY!",
    items: [
      {
        title: "How to use waypoints",
        description: "Download extension pack and follow steps in pack description.",
        link: "https://youtu.be/HLJQOW-TkeU",
        tags: ["All Devices", "Featured"],
      },
      {
        title: "Enable Controller Mode",
        description: "Use the subpack options to set the desired mode.",
        link: "https://youtu.be/1wpWo-kY8UE",
        tags: ["All Devices"],
      },
    ],
  },
  mobile: {
    description:
      "List of videos for mobile devices designed to explain the features and tools that Better Bedrock provides. TUTORIALS ARE DIFFERENT FOR EACH CATEGORY!",
    items: [
      {
        title: "Download and Import Texture Pack to Minecraft",
        description: "Classic installation tutorial.",
        link: "https://youtu.be/dOTW4ffn9rA",
        tags: ["Mobile"],
      },
      {
        title: "Manually edit config",
        description: "Everything is explained in video. All ways, tools etc.",
        link: "https://youtu.be/rPNfW_swUp4",
        tags: ["Mobile", "Featured"],
      },
      {
        title: "Edit config before importing pack",
        description: "It's optional way to save config - may be used to import pack to console.",
        link: "https://youtu.be/OIuGRJk_rbA",
        tags: [ "Mobile", "Featured" ]
      },
    ],
  },
  pc: {
    description:
      "List of videos for PC/Other devices designed to explain the features and tools that Better Bedrock provides. TUTORIALS ARE DIFFERENT FOR EACH CATEGORY!",
    items: [
      {
        title: "Download and Import Texture Pack to Minecraft",
        description: "Classic installation tutorial.",
        link: "https://youtu.be/QV67l-vrlSI",
        tags: [ "PC" ]
      },
      {
        title: "Manually edit config",
        description:
          "For the console only, you need to import this config to the game.",
        link: "https://youtu.be/QG9vJq6UPGA",
        tags: [ "PC/Console", "Featured" ]
      },
      {
        title: "How to set up autosprint",
        description:
          "Simple bind change that works on PC, but may not work on the console - not tested",
        link: "https://youtu.be/O3D6bNQW-Lc",
        tags: [ "PC/Console" ]
      },
      {
        title: "How to create custom theme",
        description: "More complex tutorial about all theme customization available in BB.",
        link: "https://youtu.be/GRQahMrdEoY",
        tags: [ "PC" ]
      },
    ],
  },
  generalDeprecated: {
    description:
      "List of DEPRECATED videos for mobile devices designed to explain the features and tools that Better Bedrock provides. TUTORIALS ARE DIFFERENT FOR EACH CATEGORY!",
    items: [
      {
        title: "Manually edit cape",
        description: "For the console only, you need to import skin to the game.",
        link: "https://youtu.be/nI-UxUOEgSU",
        tags: [ "PC/Console", "Deprecated" ],
      },
      {
        title: "Manually edit cape",
        description: "Everything is explained in video. All ways, tools etc.",
        link: "https://youtu.be/CCraMUpQX_Q",
        tags: [ "Mobile", "Deprecated" ],
      },
      {
        title: "Download and Install BB Mobile App",
        description: "Classic installation tutorial.",
        link: "https://youtu.be/3Rox3FRRo84",
        tags: [ "Mobile", "Deprecated" ],
      },
      {
        title: "Edit config in Mobile App",
        description: "Everything is explained in video.",
        link: "https://youtu.be/Pn-9RxvNFPM",
        tags: [ "Mobile", "Deprecated" ],
      },
      {
        title: "Edit cape in Mobile App",
        description: "Everything is explained in video.",
        link: "https://youtu.be/t0d4_LuDPEs",
        tags: [ "Mobile", "Deprecated" ],
      },
    ],
  },
};
