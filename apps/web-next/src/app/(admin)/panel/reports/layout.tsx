import { ReportsManagerProvider } from "@/features/panel/reports/providers/reports-manager";
import { ReactNode } from "react";

import styles from "./reports.module.scss";
import { Section } from "@/components/section";

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
