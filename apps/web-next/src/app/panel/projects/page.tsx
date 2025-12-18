import { Section } from "@/_components/section";
import { Hero } from "./components/hero/hero";

import styles from "./projects.module.scss";

export default function Projects() {
  return (
    <Section
      className={styles.background}
      extraClassName={styles.padding}
      fixed
    >
      <Hero />
    </Section>
  );
}
