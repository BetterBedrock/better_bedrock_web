import { ReportsManagerProvider } from "~/pages/panel/reports/providers/reports-manager";
import { Reports } from "~/pages/panel/reports/reports";

export const ReportsWrapper = () => (
  <ReportsManagerProvider>
    <Reports />
  </ReportsManagerProvider>
);
