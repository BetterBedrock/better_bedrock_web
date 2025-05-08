import { Section } from "~/components/section";
import { Hero } from "./components/hero";
import { styles } from ".";
import { Files } from "~/pages/panel/analytics/components/files";

export const Analytics = () => (
  <main>
    <Section className={styles.background} fixed center>
      <Hero />
      <Files />
    </Section>
  </main>
);
