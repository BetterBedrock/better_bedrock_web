import { ReportsManagerProvider } from "@/pages/panel/model/reports-manager";
import { ReactNode } from "react";

import { reportsPageStyles } from "@/pages/panel";
import { Section } from "@/shared/ui/section";
import { fetchAllReports } from "@/entities/report";

interface ReportsLayoutProps {
  children: ReactNode;
}

export default async function ReportsLayout({ children }: ReportsLayoutProps) {
  const defaultReports = await fetchAllReports();

  return (
    <ReportsManagerProvider defaultReports={defaultReports}>
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
