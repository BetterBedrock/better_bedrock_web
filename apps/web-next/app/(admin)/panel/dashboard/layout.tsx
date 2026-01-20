import { Section } from "@/shared/ui/section";
import { ReactNode } from "react";

import { styles } from "@/pages/panel/dashboard";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <Section
      className={styles.background}
      extraClassName={styles.padding}
      fixed
      center
    >
      {children}
    </Section>
  );
}
