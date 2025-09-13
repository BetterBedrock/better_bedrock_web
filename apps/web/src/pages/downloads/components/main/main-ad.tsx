import { MainBanner } from "~/pages/downloads/components/main/main-banner";
import { styles } from ".";
import BetterBedrockImage from "~/assets/images/crosshair_backgrounds/25.png";
// import ExtensionsImage from "~/assets/images/crosshair_backgrounds/26.png";
import SideProjectsImage from "~/assets/images/crosshair_backgrounds/27.png";
import { Routes } from "~/utils/routes";

export const MainAd = () => {
  return (
    <div className={styles.ad}>
      <MainBanner
        image={BetterBedrockImage}
        grid="bb"
        color="#00a000"
        text="Better Bedrock"
        link={Routes.DOWNLOADS_BETTERBEDROCK}
      />
      {/* <MainBanner
        image={ExtensionsImage}
        grid="extensions"
        color="#ff6a00"
        text="Extensions"
        link={""}
      />*/}
      <MainBanner
        image={SideProjectsImage}
        grid="side"
        color="#0094ff"
        text="Side Projects"
        link={Routes.DOWNLOADS_BETTERBEDROCK}
      />
    </div>
  );
};
