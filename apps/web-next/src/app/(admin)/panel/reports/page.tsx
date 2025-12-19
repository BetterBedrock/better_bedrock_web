"use client";

import { Hero } from "@/features/panel/reports/components/hero/hero";
import { HeroReportPopup } from "@/features/panel/reports/components/hero/hero-report-popup";
import { useReportsManager } from "@/features/panel/reports/providers/reports-manager";

export default function Reports() {
  const { selectedReport } = useReportsManager();

  return (
    <>
      {selectedReport && <HeroReportPopup />}
      <Hero />
    </>
  );
}
