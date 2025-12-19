import { Hero } from "./components/hero/hero";
import { Section } from "@/components/section";

import styles from "./success.module.scss";

export interface SuccessPageProps {
  searchParams: Promise<{ checkoutId: string }>;
}

export default function Success({ searchParams }: SuccessPageProps) {
  return (
    <Section
      className={styles.background}
      extraClassName={styles.padding}
      fixed
      center
    >
      <Hero searchParams={searchParams} />
    </Section>
  );
}
