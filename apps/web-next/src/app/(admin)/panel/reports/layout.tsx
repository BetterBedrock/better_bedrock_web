import { ReportsManagerProvider } from "@/app/(admin)/panel/reports/providers/reports-manager";
import { ReactNode } from "react";

interface ReportsLayoutProps {
  children: ReactNode;
}

export default function ReportsLayout({ children }: ReportsLayoutProps) {
  return <ReportsManagerProvider>{children}</ReportsManagerProvider>;
}
