"use client";

import { Hero } from "./components/hero/hero";
import { HeroReportPopup } from "./components/hero/hero-report-popup";
import { useReportsManager } from "@/app/(admin)/panel/reports/providers/reports-manager";
import { Section } from "@/components/section";

import styles from "./reports.module.scss";

export default function Reports() {
  const { selectedReport } = useReportsManager();

  return (
    <>
      {selectedReport && <HeroReportPopup />}
      <Section
        className={styles.background}
        extraClassName={styles.padding}
        fixed
      >
        <Hero />
      </Section>
    </>
  );
}
