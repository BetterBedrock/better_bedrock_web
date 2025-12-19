import { Section } from "@/components/section";
import { ReactNode } from "react";

import styles from "./downloads.module.scss";

interface DownloadsLayoutProps {
  children: ReactNode;
}

export default function DownloadsLayout({ children }: DownloadsLayoutProps) {
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
