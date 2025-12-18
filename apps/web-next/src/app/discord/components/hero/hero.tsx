import { HeroAction } from "./hero-action";
import { HeroTitle } from "./hero-title";
import { HeroDescription } from "./hero-description";

import styles from "./hero.module.scss";

export const Hero = () => (
  <div>
    <div className={styles.header}>
      <HeroTitle />
      <HeroDescription />
    </div>
    <HeroAction />
  </div>
);
