import { Hero } from "./components/hero";
import { styles } from ".";
import { Files } from "./components/files";
import { Section } from "@/_components/section";

export default function Analytics() {
  return (
    <Section
      className={styles.background}
      extraClassName={styles.padding}
      fixed
      center
    >
      <Hero />
      <Files />
    </Section>
  );
}
