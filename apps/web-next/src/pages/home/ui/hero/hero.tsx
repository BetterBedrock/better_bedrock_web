import { Section } from "@/shared/ui/section";
import { HeroHeader } from "./hero-header";
import { HeroTrailer } from "./hero-trailer";

import styles from "./hero.module.scss";

export const Hero = () => (
  <Section
    extraClassName={styles.padding}
    center
    src="/images/crosshair_backgrounds/9.webp"
    gradientBackground={true}
  >
    <HeroHeader />
    <HeroTrailer />
  </Section>
);
