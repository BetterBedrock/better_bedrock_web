import { ReportsManagerProvider } from "@/pages/panel/reports/model/reports-manager";
import { ReactNode } from "react";

import { styles } from "@/pages/panel/reports";
import { Section } from "@/shared/ui/section";

interface ReportsLayoutProps {
  children: ReactNode;
}

export default function ReportsLayout({ children }: ReportsLayoutProps) {
  return (
    <ReportsManagerProvider>
      <Section
        className={styles.background}
        extraClassName={styles.padding}
        fixed
      >
        {children}
      </Section>
    </ReportsManagerProvider>
  );
}
