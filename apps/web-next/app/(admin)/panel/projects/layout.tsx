import { Section } from "@/shared/ui/section";
import { ReactNode } from "react";

import { projectsPageStyles } from "@/pages/panel";

interface ProjectsLayoutProps {
  children: ReactNode;
}

export default function ProjectsLayout({ children }: ProjectsLayoutProps) {
  return (
    <Section
      className={projectsPageStyles.background}
      extraClassName={projectsPageStyles.padding}
      fixed
    >
      {children}
    </Section>
  );
}
