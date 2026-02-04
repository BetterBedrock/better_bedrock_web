import { ReportsManagerProvider } from "@/pages/panel/model/reports-manager";
import { ReactNode } from "react";

import { reportsPageStyles } from "@/pages/panel";
import { Section } from "@/shared/ui/section";

interface ReportsLayoutProps {
  children: ReactNode;
}

export default function ReportsLayout({ children }: ReportsLayoutProps) {
  return (
    <ReportsManagerProvider>
      <Section
        extraClassName={reportsPageStyles.padding}
        fixed
        src="/images/crosshair_backgrounds/6.webp"
      >
        {children}
      </Section>
    </ReportsManagerProvider>
  );
}
