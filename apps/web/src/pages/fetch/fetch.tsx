import { Section } from "~/components/section";
import { Hero } from "./components/hero";
import { styles } from ".";

export const Fetch = () => (
  <main>
    <Section className={styles.background}>
      <Hero />
    </Section>
  </main>
);
