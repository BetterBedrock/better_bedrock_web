import { Section } from "@/shared/ui/section";
import { ReactNode } from "react";

import { analyticsPageStyles } from "@/pages/panel";

interface AnalyticsLayoutProps {
  children: ReactNode;
}

export default function AnalyticsLayout({ children }: AnalyticsLayoutProps) {
  return (
    <Section
      className={analyticsPageStyles.background}
      extraClassName={analyticsPageStyles.padding}
      fixed
      center
    >
      {children}
    </Section>
  );
}
