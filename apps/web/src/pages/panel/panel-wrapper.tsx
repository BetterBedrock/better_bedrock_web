import { Outlet } from "react-router-dom";
import { VoucherProvider } from "~/providers/voucher";

export const PanelWrapper = () => (
  <VoucherProvider>
    <Outlet />
  </VoucherProvider>
);
