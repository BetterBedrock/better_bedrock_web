import { Hero } from "./components/hero";
import { styles } from ".";
import { Section } from "@/_components/section";

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
