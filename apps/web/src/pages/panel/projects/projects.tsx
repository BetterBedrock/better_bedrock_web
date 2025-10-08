import { Section } from "~/components/section";
import { styles } from ".";
import { Hero } from "~/pages/panel/projects/components/hero";

export const Projects = () => (
  <main>
    <Section className={styles.background} extraClassName={styles.padding} fixed>
      <Hero />
    </Section>
  </main>
);
