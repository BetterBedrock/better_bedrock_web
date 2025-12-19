import { Banner } from "@/components/banner";
import { CircularProgressIndicator } from "@/components/circular-progress-indicator";
import { ReportCard } from "@/components/report-card";
import { useReportsManager } from "@/app/(admin)/panel/reports/providers/reports-manager";

import styles from "./unresolved.module.scss";

export const Unresolved = () => {
  const { setSelectedReport, reports } = useReportsManager();

  if (!reports) {
    return <CircularProgressIndicator center />;
  }

  if (reports.length === 0) {
    return <Banner message="No unresolved reports" type="neutral" />;
  }

  return (
    <div className={styles.projects}>
      {reports
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
