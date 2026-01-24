import { Section } from "@/shared/ui/section";
import { ReactNode } from "react";

import { styles } from "@/pages/project";

interface ProjectLayoutProps {
  children: ReactNode;
}

export default async function ProjectLayout({ children }: ProjectLayoutProps) {
  return (
    <Section
      extraClassName={styles.padding}
      fixed
      center
      src="/images/crosshair_backgrounds/16.webp"
    >
      <div className={styles.card}>{children}</div>
    </Section>
  );
}
