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
        className={reportsPageStyles.background}
        extraClassName={reportsPageStyles.padding}
        fixed
      >
        {children}
      </Section>
    </ReportsManagerProvider>
  );
}
