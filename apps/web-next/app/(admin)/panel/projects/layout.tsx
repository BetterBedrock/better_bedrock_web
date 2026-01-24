import { Section } from "@/shared/ui/section";
import { ReactNode } from "react";

import { projectsPageStyles } from "@/pages/panel";

interface ProjectsLayoutProps {
  children: ReactNode;
}

export default function ProjectsLayout({ children }: ProjectsLayoutProps) {
  return (
    <Section
      extraClassName={projectsPageStyles.padding}
      fixed
      src="/images/crosshair_backgrounds/6.webp"
    >
      {children}
    </Section>
  );
}
