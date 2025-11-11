import { Section } from "@/_components/section";
import { Hero } from "@/app/discord/components/hero";

import { styles } from ".";

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
