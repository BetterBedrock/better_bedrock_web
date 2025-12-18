import { Section } from "@/_components/section";
import { HeroHeader } from "./hero-header";
import { HeroTrailer } from "./hero-trailer";

import styles from "./hero.module.scss";

export const Hero = () => (
  <Section className={styles.background} extraClassName={styles.padding} center>
    <HeroHeader />
    <HeroTrailer />
  </Section>
);
