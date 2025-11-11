"use client";

import { Hero, HeroReportPopup } from "./components/hero";
import { styles } from ".";
import { useReportsManager } from "@/app/panel/reports/providers/reports-manager";
import { Section } from "@/_components/section";

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
