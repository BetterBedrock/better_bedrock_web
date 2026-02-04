import { Section } from "@/shared/ui/section";
import { ReactNode } from "react";

import { dashboardPageStyles } from "@/pages/panel";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <Section
      extraClassName={dashboardPageStyles.padding}
      fixed
      center
      src="/images/crosshair_backgrounds/6.webp"
    >
      {children}
    </Section>
  );
}
