import { ReportCard } from "~/components/bedrock/report-card";
import { useReportsManager } from "~/pages/panel/reports/providers/reports-manager";
import { styles } from ".";
import { CircularProgressIndicator } from "~/components/bedrock/circular-progress-indicator";
import { Banner } from "~/components/bedrock/banner";

export const Resolved = () => {
  const { setSelectedReport, reports } = useReportsManager();

  if(!reports) {
    return <CircularProgressIndicator center/>
  }

  if(reports.length === 0) {
    return <Banner message="No resolved reports" type="neutral"/>
  }
  return (
    <div className={styles.projects}>
      {reports
        ?.filter((r) => r.resolved)
        .map((report, index) => (
          <ReportCard key={index} report={report} onClick={async () => setSelectedReport(report)} />
        ))}
    </div>
  );
};
