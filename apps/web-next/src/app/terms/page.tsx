import { Hero } from "./components/hero";
import { Section } from "@/_components/section";

import { styles } from ".";

export default function Terms() {
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
