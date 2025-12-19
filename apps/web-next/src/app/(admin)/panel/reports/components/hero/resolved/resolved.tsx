import { Banner } from "@/components/banner";
import { CircularProgressIndicator } from "@/components/circular-progress-indicator";
import { useReportsManager } from "@/app/(admin)/panel/reports/providers/reports-manager";
import { ReportCard } from "@/components/report-card";

import styles from "./resolved.module.scss";

export const Resolved = () => {
  const { setSelectedReport, reports } = useReportsManager();

  if (!reports) {
    return <CircularProgressIndicator center />;
  }

  if (reports.length === 0) {
    return <Banner message="No resolved reports" type="neutral" />;
  }

  return (
    <div className={styles.projects}>
      {reports
        ?.filter((r) => r.resolved)
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
