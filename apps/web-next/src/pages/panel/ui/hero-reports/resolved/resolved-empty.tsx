"use client";

import { useReportsManager } from "@/pages/panel/model/reports-manager";
import { Banner } from "@/shared/ui/banner";

export const ResolvedEmpty = () => {
  const { resolvedReports } = useReportsManager();

  if (resolvedReports.length > 0) return;

  return <Banner message="No resolved reports." variant="neutral" />;
};
