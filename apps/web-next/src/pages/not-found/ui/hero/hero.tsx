import { HeroTitle } from "./hero-title";
import { HeroDescription } from "./hero-description";
import { HeroActions } from "./hero-actions";
import { Section } from "@/shared/ui/section";
import styles from "./hero.module.scss";

export const Hero = () => (
  <Section
    className={styles.background}
    extraClassName={styles.padding}
    fixed
    center
  >
    <div>
      <HeroTitle />
      <HeroDescription />
      <HeroActions />
    </div>
  </Section>
);
