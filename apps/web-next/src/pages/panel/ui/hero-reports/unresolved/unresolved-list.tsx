"use client";

import { ReportCard } from "@/pages/panel/ui/hero-reports/report-card";
import styles from "./unresolved.module.scss";
import { useReportsManager } from "@/pages/panel/model/reports-manager";

export const UnresolvedList = () => {
  const { unresolvedReports, setSelectedReport } = useReportsManager();

  if (unresolvedReports.length <= 0) return;

  return (
    <div className={styles.projects}>
      {unresolvedReports
        ?.filter((r) => !r.resolved)
        .map((report, index) => (
          <ReportCard
            key={index}
            report={report}
            onClick={async () => setSelectedReport(report)}
          />
        ))}
    </div>
  );
};
