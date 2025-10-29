import banner1 from "@/public/images/banners/bb1.webp";
import banner2 from "@/public/images/banners/bb2.webp";
import banner3 from "@/public/images/banners/bb3.webp";
import banner4 from "@/public/images/banners/bb4.webp";
import banner5 from "@/public/images/banners/bb5.webp";
import banner6 from "@/public/images/banners/bb6.webp";

import crosshairBackground12 from "@/public/images/crosshair_backgrounds/12.webp";
import crosshairBackground13 from "@/public/images/crosshair_backgrounds/13.webp";

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
        image: banner1.src,
      },
      {
        title: "Mod Menu",
        description:
          "Fully customizable mods and adjustable HUD elements that provide essential information!",
        image: banner2.src,
      },
      {
        title: "Custom UIs",
        description:
          "Revamped custom UIs offer a refreshed design, giving Minecraft's main screens a sleek and updated look!",
        image: banner3.src,
      },
    ],
    backgroundImage: crosshairBackground12.src,
  },
  {
    elements: [
      {
        title: "Many Extension Packs",
        description:
          "Extra packs like Waypoints, Better Fogs, and Dark Mode are designed to improve your Minecraft experience!",
        image: banner4.src,
      },
      {
        title: "Config System",
        description:
          "After you figure out mods, you are able to save all their states and edit some extra global options!",
        image: banner5.src,
      },
      {
        title: "Platform Support",
        description:
          "And at the end of the day, you can use this Texture Pack on computer, later on your phone and finally on a friend's Console!",
        image: banner6.src,
      },
    ],
    backgroundImage: crosshairBackground13.src,
  },
];
