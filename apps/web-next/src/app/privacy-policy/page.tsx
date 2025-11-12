import { Hero } from "./components/hero";
import { styles } from ".";
import { Section } from "@/_components/section";

export default function PrivacyPolicy() {
  return (
    <main>
      <Section
        className={styles.background}
        extraClassName={styles.padding}
        fixed
        center
      >
        <Hero />
      </Section>
    </main>
  );
}
