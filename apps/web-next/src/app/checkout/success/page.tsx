import { Hero } from "./components/hero";
import { Section } from "@/_components/section";

import { styles } from ".";

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
