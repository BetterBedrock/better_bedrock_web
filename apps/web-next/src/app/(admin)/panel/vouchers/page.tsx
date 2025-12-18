import { Hero } from "./components/hero/hero";
import { Section } from "@/_components/section";

import styles from "./vouchers.module.scss";

export default function Vouchers() {
  return (
    <Section
      className={styles.background}
      extraClassName={styles.padding}
      fixed
    >
      <Hero />
    </Section>
  );
}
