import { useReportsManager } from "@/pages/panel/model/reports-manager";
import { ReportCard } from "@/pages/panel/ui/hero-reports/report-card";
import styles from "./resolved.module.scss";

export const ResolvedList = () => {
  const { resolvedReports, setSelectedReport } = useReportsManager();

  return (
    <div className={styles.projects}>
      {resolvedReports
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
