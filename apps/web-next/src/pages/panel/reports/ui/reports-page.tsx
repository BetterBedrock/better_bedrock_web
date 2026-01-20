"use client";

import { Hero } from "./hero/hero";
import { HeroReportPopup } from "@/pages/panel/reports/ui/hero/hero-report-popup";
import { useReportsManager } from "@/pages/panel/reports/model/reports-manager";

export const ReportsPage = () => {
  const { selectedReport } = useReportsManager();

  return (
    <>
      {selectedReport && <HeroReportPopup />}
      <Hero />
    </>
  );
};
