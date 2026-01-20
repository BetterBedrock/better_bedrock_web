import { Section } from "@/shared/ui/section";
import { ReactNode } from "react";

import { styles } from "@/pages/project";

interface ProjectLayoutProps {
  children: ReactNode;
}

export default async function ProjectLayout({ children }: ProjectLayoutProps) {
  return (
    <Section
      className={styles.background}
      extraClassName={styles.padding}
      fixed
      center
    >
      <div className={styles.card}>{children}</div>
    </Section>
  );
}
