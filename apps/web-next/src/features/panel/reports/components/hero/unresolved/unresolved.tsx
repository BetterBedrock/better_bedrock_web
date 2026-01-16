import { Banner } from "@/components/banner";
import { CircularProgressIndicator } from "@/components/circular-progress-indicator";
import { ReportCard } from "@/components/report-card";
import { useReportsManager } from "@/features/panel/reports/providers/reports-manager";

import styles from "./unresolved.module.scss";
import { Card, CardBody } from "@/components/card/card";

export const Unresolved = () => {
  const { setSelectedReport, reports } = useReportsManager();

  return (
    <Card fullWidth>
      <CardBody>
        {!reports && <CircularProgressIndicator center />}
        {(reports && reports.length === 0) ? <Banner message="No unresolved reports" type="neutral" /> : <div className={styles.projects}>
          {reports
            ?.filter((r) => !r.resolved)
            .map((report, index) => (
              <ReportCard
                key={index}
                report={report}
                onClick={async () => setSelectedReport(report)}
              />
            ))}
        </div>}
      </CardBody>
    </Card>
  );
};
