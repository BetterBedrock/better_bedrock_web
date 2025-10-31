import BetterBedrockImage from "@/public/images/crosshair_backgrounds/25.webp";
import SideProjectsImage from "@/public/images/crosshair_backgrounds/27.webp";

import { styles, FeaturedCardBanner } from ".";
import { Routes } from "@/utils/routes";

export const FeaturedCardAds = () => (
  <div className={styles.ad}>
    <FeaturedCardBanner
      image={BetterBedrockImage.src}
      grid="bb"
      color="#00a000"
      text="Better Bedrock"
      link={Routes.DOWNLOADS_BETTERBEDROCK}
    />
    <FeaturedCardBanner
      image={SideProjectsImage.src}
      grid="side"
      color="#0094ff"
      text="Side Projects"
      link={Routes.DOWNLOADS_SIDE_PROJECTS}
    />
  </div>
);
