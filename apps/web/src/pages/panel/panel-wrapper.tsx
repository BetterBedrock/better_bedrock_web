import { Outlet } from "react-router-dom";
import { AnalyticsProvider } from "~/providers/analytics";
import { VoucherProvider } from "~/providers/voucher";

export const PanelWrapper = () => (
  <AnalyticsProvider>
    <VoucherProvider>
      <Outlet />
    </VoucherProvider>
  </AnalyticsProvider>
);
