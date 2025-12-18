import { HeroTitle } from "./hero-title";
import { HeroDescription } from "./hero-description";
import { HeroActions } from "./hero-actions";
import styles from "./hero.module.scss";

export const Hero = () => (
  <div className={styles.hero}>
    <HeroTitle />
    <HeroDescription />
    <HeroActions />
  </div>
);
