"use client";

import { useReportsManager } from "@/pages/panel/model/reports-manager";
import { Banner } from "@/shared/ui/banner";

export const UnresolvedEmpty = () => {
  const { unresolvedReports } = useReportsManager();

  if (unresolvedReports.length > 0) return;

  return <Banner message="No unresolved reports." variant="neutral" />;
};
