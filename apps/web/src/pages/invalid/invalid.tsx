import { Section } from "~/components/section";
import { Hero } from "~/pages/invalid/components/hero";
import { styles } from ".";

export const Invalid = () => (
  <main>
    <Section className={styles.background} fixed center>
      <Hero />
    </Section>
  </main>
);
