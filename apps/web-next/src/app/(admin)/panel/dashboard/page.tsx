import { Hero } from "./components/hero/hero";
import { Section } from "@/components/section";

import styles from "./dashboard.module.scss";

export default function Dashboard() {
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
