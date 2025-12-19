import { Section } from "@/components/section";
import { ReactNode } from "react";

import styles from "./project.module.scss";

export interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

interface ProjectsLayoutProps {
  children: ReactNode;
}

export default async function ProjectLayout({ children }: ProjectsLayoutProps) {
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
