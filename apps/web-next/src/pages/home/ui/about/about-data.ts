import banner1 from "@/public/images/banners/bb1.webp";
import banner2 from "@/public/images/banners/bb2.webp";
import banner3 from "@/public/images/banners/bb3.webp";
import banner4 from "@/public/images/banners/bb4.webp";
import banner5 from "@/public/images/banners/bb5.webp";
import banner6 from "@/public/images/banners/bb6.webp";

import crosshairBackground13 from "@/public/images/crosshair_backgrounds/13.webp";
import crosshairBackground14 from "@/public/images/crosshair_backgrounds/14.webp";

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
        title: "Elite Gameplay Experience",
        description:
          "Dominate the game with advanced HUD mods. Gain a strategic advantage with real-time info right on your screen.",
        image: banner1.src,
      },
      {
        title: "Ultimate Control Center",
        description:
          "Fully customizable Mod Menu. Toggle features, move HUD elements, and tailor the interface to your exact playstyle.",
        image: banner2.src,
      },
      {
        title: "Sleek Visual Overhaul",
        description:
          "Say goodbye to the boring vanilla look. Enjoy a completely revamped, modern dark-themed interface across all menus.",
        image: banner3.src,
      },
    ],
    backgroundImage: crosshairBackground13.src,
  },
  {
    elements: [
      {
        title: "Limitless Customization",
        description:
          "Take it further with exclusive extension packs like Waypoints, Better Fogs, and Dark Mode to maximize your experience.",
        image: banner4.src,
      },
      {
        title: "Save & Load Instantly",
        description:
          "Don't lose your setup. Easily configure global options and save your perfect mod profiles for any situation.",
        image: banner5.src,
      },
      {
        title: "Play Anywhere",
        description:
          "One pack, all devices. Seamlessly switch between PC, Mobile, and Console without losing quality or features.",
        image: banner6.src,
      },
    ],
    backgroundImage: crosshairBackground14.src,
  },
];
