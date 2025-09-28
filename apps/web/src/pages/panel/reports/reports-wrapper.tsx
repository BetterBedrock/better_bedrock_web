import { ReportsManagerProvider } from "~/pages/panel/reports/providers/reports-manager";
import { Reports } from "~/pages/panel/reports/reports";
import { ReportProvider } from "~/providers/report";

export const ReportsWrapper = () => (
  <ReportProvider>
    <ReportsManagerProvider>
      <Reports />
    </ReportsManagerProvider>
  </ReportProvider>
);
