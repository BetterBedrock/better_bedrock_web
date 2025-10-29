import BetterBedrockImage from "~/assets/images/crosshair_backgrounds/25.webp";
import SideProjectsImage from "~/assets/images/crosshair_backgrounds/27.webp";
import { Routes } from "~/utils/routes";

import { styles, FeaturedCardBanner } from ".";

export const FeaturedCardAds = () => (
  <div className={styles.ad}>
    <FeaturedCardBanner
      image={BetterBedrockImage}
      grid="bb"
      color="#00a000"
      text="Better Bedrock"
      link={Routes.DOWNLOADS_BETTERBEDROCK}
    />
    <FeaturedCardBanner
      image={SideProjectsImage}
      grid="side"
      color="#0094ff"
      text="Side Projects"
      link={Routes.DOWNLOADS_SIDE_PROJECTS}
    />
  </div>
);
