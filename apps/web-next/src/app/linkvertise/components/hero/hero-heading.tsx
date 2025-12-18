import { HeroDescription } from "./hero-description";
import { HeroTitle } from "./hero-title";
import styles from "./hero.module.scss";

export const HeroHeading = () => (
  <div className={styles.cardTextWrapper}>
    <HeroTitle />
    <HeroDescription />
  </div>
);
