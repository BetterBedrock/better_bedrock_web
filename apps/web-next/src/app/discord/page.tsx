import { Section } from "@/_components/section";
import { Hero } from "./components/hero/hero";

import styles from "./discord.module.scss";

export default function Discord() {
  return (
    <Section
      className={styles.background}
      extraClassName={styles.padding}
      fixed
      center
    >
      <Hero />
    </Section>
  );
}
