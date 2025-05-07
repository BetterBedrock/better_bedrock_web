import { Section } from "~/components/section";
import { Hero } from "./components/hero";
import { styles } from ".";

export const Login = () => (
  <main>
    <Section className={styles.background} fixed center>
      <Hero />
    </Section>
  </main>
);
