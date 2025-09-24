import { Section } from "~/components/section";
import { Hero } from "./components/hero";
import { styles } from ".";

export const Vouchers = () => (
  <main>
    <Section className={styles.background} extraClassName={styles.padding} fixed>
      <Hero />
    </Section>
  </main>
);
