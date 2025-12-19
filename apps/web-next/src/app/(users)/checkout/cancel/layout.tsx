import { Section } from "@/components/section";
import { ReactNode } from "react";

import styles from "./cancel.module.scss";

interface CancelLayoutProps {
  children: ReactNode;
}

export default async function CancelLayout({ children }: CancelLayoutProps) {
  return (
    <Section
      className={styles.background}
      extraClassName={styles.padding}
      fixed
      center
    >
      {children}
    </Section>
  );
}
