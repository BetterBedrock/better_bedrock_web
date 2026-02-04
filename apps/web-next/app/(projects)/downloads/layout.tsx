import { Section } from "@/shared/ui/section";
import { ReactNode } from "react";

import { styles } from "@/pages/downloads";

interface DownloadsLayoutProps {
  children: ReactNode;
}

export default function DownloadsLayout({ children }: DownloadsLayoutProps) {
  return (
    <Section
      extraClassName={styles.padding}
      fixed
      src="/images/crosshair_backgrounds/16.webp"
    >
      {children}
    </Section>
  );
}
