import { Section } from "@/shared/ui/section";
import { ReactNode } from "react";

import { analyticsPageStyles } from "@/pages/panel";

interface AnalyticsLayoutProps {
  children: ReactNode;
}

export default function AnalyticsLayout({ children }: AnalyticsLayoutProps) {
  return (
    <Section
      extraClassName={analyticsPageStyles.padding}
      fixed
      center
      src="/images/crosshair_backgrounds/6.webp"
    >
      {children}
    </Section>
  );
}
