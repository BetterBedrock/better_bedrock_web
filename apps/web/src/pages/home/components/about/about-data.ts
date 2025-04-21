import banner1 from "~/assets/images/banners/bb1.png";
import banner2 from "~/assets/images/banners/bb2.png";
import banner3 from "~/assets/images/banners/bb3.png";
import banner4 from "~/assets/images/banners/bb4.png";
import banner5 from "~/assets/images/banners/bb5.png";
import banner6 from "~/assets/images/banners/bb6.png";

import crosshairBackground12 from "~/assets/images/crosshair_backgrounds/12.png";
import crosshairBackground13 from "~/assets/images/crosshair_backgrounds/13.png";

export interface AboutSectionElement {
  title: string;
  description: string;
  image: string;
}

interface AboutSectionData {
  elements: AboutSectionElement[];
  backgroundImage: string;
}

export const aboutSectionsData: AboutSectionData[] = [
  {
    elements: [
      {
        title: "Gameplay on Another Level",
        description:
          "Improved experience with HUD mods, making gameplay more immersive and strategic!",
        image: banner1,
      },
      {
        title: "Mod Menu",
        description:
          "Fully customizable mods and adjustable HUD elements that provide essential information!",
        image: banner2,
      },
      {
        title: "Custom UIs",
        description:
          "Revamped custom UIs offer a refreshed design, giving Minecraft's main screens a sleek and updated look!",
        image: banner3,
      },
    ],
    backgroundImage: crosshairBackground12,
  },
  {
    elements: [
      {
        title: "Many Extension Packs",
        description:
          "Extra packs like Waypoints, Better Fogs, and Dark Mode are designed to improve your Minecraft experience!",
        image: banner4,
      },
      {
        title: "Config System",
        description:
          "After you figure out mods, you are able to save all their states and edit some extra global options!",
        image: banner5,
      },
      {
        title: "Platform Support",
        description:
          "And at the end of the day, you can use this Texture Pack on computer, later on your phone and finally on a friend's Console!",
        image: banner6,
      },
    ],
    backgroundImage: crosshairBackground13,
  },
];
