"use client";

import { useReportsManager } from "@/pages/panel/model/reports-manager";
import { HeroReports } from "@/pages/panel/ui/hero-reports/hero-reports";
import { HeroReportsPopup } from "@/pages/panel/ui/hero-reports/hero-reports-popup";

export const ReportsPage = () => {
  const { selectedReport } = useReportsManager();

  return (
    <>
      {selectedReport && <HeroReportsPopup />}
      <HeroReports />
    </>
  );
};
