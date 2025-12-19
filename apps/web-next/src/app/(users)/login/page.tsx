import { Hero } from "./components/hero/hero";
import { Section } from "@/components/section";

import styles from "./login.module.scss";

export default function Login() {
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
