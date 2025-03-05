import { PageImageWrapper } from "components/bedrock/page-image-wrapper";
import { HeroHeader } from "./hero-header";
import { HeroTrailer } from "./hero-trailer";
import { HeroBottomText } from "./hero-bottom-text";

import styles from "./hero.module.css";

export const Hero = () => (
  <PageImageWrapper backgroundUrl={require("../../../assets/images/crosshair_backgrounds/1.png")}>
    <section id={styles.homeSection}>
      <HeroHeader />
      <HeroTrailer />
      <HeroBottomText />
    </section>
  </PageImageWrapper>
);
