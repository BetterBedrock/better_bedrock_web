import { Outlet } from "react-router-dom";
import { ProtectedRoute } from "~/components/protected-route/protected-route";
import { AnalyticsProvider } from "~/providers/analytics";
import { VoucherProvider } from "~/providers/voucher";

export const PanelWrapper = () => (
  <ProtectedRoute>
    <AnalyticsProvider>
      <VoucherProvider>
        <Outlet />
      </VoucherProvider>
    </AnalyticsProvider>
  </ProtectedRoute>
);
