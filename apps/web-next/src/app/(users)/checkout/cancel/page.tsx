import { Hero } from "./components/hero/hero";
import { Section } from "@/components/section";

import styles from "./cancel.module.scss";

export default function Page() {
  return (
    <Section
      className={styles.background}
      extraClassName={styles.padding}
      fixed
      center
    >
      <Hero />
    </Section>
  );
}
