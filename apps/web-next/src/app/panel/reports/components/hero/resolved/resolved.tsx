import { Banner } from "@/_components/banner";
import { CircularProgressIndicator } from "@/_components/circular-progress-indicator";
import { useReportsManager } from "@/app/panel/reports/providers/reports-manager";
import { styles } from ".";
import { ReportCard } from "@/_components/report-card";

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
