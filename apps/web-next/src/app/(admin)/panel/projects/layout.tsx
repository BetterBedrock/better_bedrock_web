import { Section } from "@/components/section";
import { ReactNode } from "react";

import styles from "./projects.module.scss";

interface ProjectsLayoutProps {
  children: ReactNode;
}

export default function ProjectsLayout({ children }: ProjectsLayoutProps) {
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
