import { Section } from "@/shared/ui/section";
import { ReactNode } from "react";

import { styles } from "@/pages/downloads";

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
