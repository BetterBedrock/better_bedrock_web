import { Section } from "~/components/section";
import { Hero } from "./components/hero";
import { styles } from ".";

export const Terms = () => (
  <main>
    <Section className={styles.background} extraClassName={styles.padding} fixed center>
      <Hero />
    </Section>
  </main>
);
