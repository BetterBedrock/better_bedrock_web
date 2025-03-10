import React from "react";
import { AboutItems } from "./about-items";
import { DynamicPageItem } from "components/bedrock/page-container/dynamic-page-item";

import styles from "./about.module.css";
import homeStyles from "pages/home/home.module.css";

interface AboutProp {
  sectionIndex: 0 | 1;
}

export const About: React.FC<AboutProp> = ({ sectionIndex }) => {
  const { elements, backgroundImage } = sectionData[sectionIndex] || sectionData[0];

  return (
    <DynamicPageItem backgroundUrl={backgroundImage}>
      <div className={homeStyles.page_content_wrapper}>
        <div className={styles.container}>
          <AboutItems items={elements} direction={sectionIndex === 0 ? "left" : "right"} />
        </div>
      </div>
    </DynamicPageItem>
  );
};

const sectionData = [
  {
    elements: [
      {
        title: "Gameplay on Another Level",
        description: "Improved experience with HUD mods, making gameplay more immersive and strategic!",
        image: require("../../../assets/images/banners/bb1.png")
      },
      {
        title: "Mod Menu",
        description: "Fully customizable mods and adjustable HUD elements that provide essential information!",
        image: require("../../../assets/images/banners/bb2.png")
      },
      {
        title: "Custom UIs",
        description: "Revamped custom UIs offer a refreshed design, giving Minecraft's main screens a sleek and updated look!",
        image: require("../../../assets/images/banners/bb3.png")
      }
    ],
    backgroundImage: require("../../../assets/images/crosshair_backgrounds/8.png")
  },
  {
    elements: [
      {
        title: "Many Extension Packs",
        description: "Extra packs like Waypoints, Better Fogs, and Dark Mode are designed to improve your Minecraft experience!",
        image: require("../../../assets/images/banners/bb4.png")
      },
      {
        title: "Config System",
        description: "After you figure out mods, you are able to save all their states and edit some extra global options!",
        image: require("../../../assets/images/banners/bb5.png")
      },
      {
        title: "Platform Support",
        description: "And at the end of the day, you can use this Texture Pack on computer, later on your phone and finally on a friend's Console!",
        image: require("../../../assets/images/banners/bb6.png")
      }
    ],
    backgroundImage: require("../../../assets/images/crosshair_backgrounds/1.png")
  }
];