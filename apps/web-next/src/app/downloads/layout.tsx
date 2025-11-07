import { Section } from "@/_components/section";
import { ReactNode } from "react";

import { styles } from ".";

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
