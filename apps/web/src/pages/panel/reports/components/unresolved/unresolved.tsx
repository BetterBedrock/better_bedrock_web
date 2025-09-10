import { ReportCard } from "~/components/bedrock/report-card";
import { useReportsManager } from "~/pages/panel/reports/providers/reports-manager";
import { styles } from ".";

export const Unresolved = () => {
  const { setSelectedReport, reports } = useReportsManager();

  return (
    <div className={styles.projects}>
      {reports
        ?.filter((r) => !r.resolved)
        .map((report, index) => (
          <ReportCard key={index} report={report} onClick={async () => setSelectedReport(report)} />
        ))}
    </div>
  );
};
