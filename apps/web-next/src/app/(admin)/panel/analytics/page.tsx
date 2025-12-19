import { Hero } from "./components/hero/hero";
import { Files } from "./components/files/files";
import { Section } from "@/components/section";

import styles from "./analytics.module.scss";

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
