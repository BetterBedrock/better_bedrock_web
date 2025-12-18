import { HeroActions } from "./hero-actions";
import { HeroHeader } from "./hero-header";
import styles from "./hero.module.scss";

export const Hero = () => (
  <div className={styles.wrapper}>
    <HeroHeader />
    <HeroActions />
  </div>
);
