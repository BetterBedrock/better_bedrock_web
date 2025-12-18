import { Section } from "@/_components/section";
import { ReactNode } from "react";

import styles from "./information.module.scss";

interface InformationLayoutProps {
  children: ReactNode;
}

export default function InformationLayout({
  children,
}: InformationLayoutProps) {
  return (
    <Section
      className={styles.background}
      extraClassName={styles.padding}
      fixed
    >
      {children}
    </Section>
  );
}
