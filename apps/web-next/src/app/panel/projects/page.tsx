import { Section } from "@/_components/section";
import { Hero } from "@/app/panel/projects/components/hero";

import { styles } from ".";

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
