import { HeroTitle } from "./hero-title";
import { HeroDescription } from "./hero-description";
import { HeroActions } from "./hero-actions";
import { Section } from "@/shared/ui/section";
import styles from "./hero.module.scss";

export const Hero = () => (
  <Section
    extraClassName={styles.padding}
    fixed
    center
    src="/images/crosshair_backgrounds/6.webp"
  >
    <div>
      <HeroTitle />
      <HeroDescription />
      <HeroActions />
    </div>
  </Section>
);
