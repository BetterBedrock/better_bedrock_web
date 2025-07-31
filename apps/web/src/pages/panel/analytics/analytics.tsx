import { Section } from "~/components/section";
import { Hero } from "./components/hero";
import { styles } from ".";
import { Files } from "./components/files";

export const Analytics = () => (
  <main>
    <Section className={styles.background} extraClassName={styles.padding} fixed center>
      <Hero />
      <Files />
    </Section>
  </main>
);
