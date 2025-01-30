import { HeroActions } from "./hero-actions";
import { HeroHeader } from "./hero-header";
import { HeroLogo } from "./hero-logo";

import styles from "./hero.module.css";
import homeStyles from "pages/home/home.module.css";

export const Hero = () => (
  <section id={styles.wrapper}>
    <div className={homeStyles.page_content_wrapper}>
      <HeroLogo />
      <HeroHeader />
      <HeroActions />
    </div>
  </section>
);
