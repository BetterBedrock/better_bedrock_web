import { Section } from "@/components/section";
import { ReactNode } from "react";

import styles from "./linkvertise.module.scss";

interface LinkvertiseLayoutProps {
  children: ReactNode;
}

export default function LinkvertiseLayout({
  children,
}: LinkvertiseLayoutProps) {
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
