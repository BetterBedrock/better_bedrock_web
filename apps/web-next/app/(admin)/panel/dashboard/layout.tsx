import { Section } from "@/shared/ui/section";
import { ReactNode } from "react";

import { dashboardPageStyles } from "@/pages/panel";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <Section
      className={dashboardPageStyles.background}
      extraClassName={dashboardPageStyles.padding}
      fixed
      center
    >
      {children}
    </Section>
  );
}
