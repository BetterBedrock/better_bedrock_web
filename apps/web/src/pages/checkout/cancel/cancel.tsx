import { Section } from "~/components/section";
import { Hero } from "./components/hero";
import { styles } from ".";

export const Cancel = () => {
  return (
    <Section className={styles.background} fixed center>
      <Hero />
    </Section>
  );
};
