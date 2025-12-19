import { Hero } from "./components/hero/hero";
import { Section } from "@/components/section";

import styles from "./privacy-policy.module.scss";

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
