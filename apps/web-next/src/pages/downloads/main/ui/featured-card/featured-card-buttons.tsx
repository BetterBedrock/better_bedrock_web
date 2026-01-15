import BetterBedrockImage from "@/public/images/crosshair_backgrounds/25.webp";
import SideProjectsImage from "@/public/images/crosshair_backgrounds/27.webp";
import { FeaturedCardBanner } from "@/pages/downloads/main/ui/featured-card/featured-card-banner";
import { Routes } from "@/shared/model/routes";
import styles from "./featured-card.module.scss";

export const FeaturedCardButtons = () => {
  return (
    <div className={styles.buttons}>
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
};
