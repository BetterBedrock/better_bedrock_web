import { Banner } from "@/components/banner";
import { CircularProgressIndicator } from "@/components/circular-progress-indicator";
import { useReportsManager } from "@/features/panel/reports/providers/reports-manager";
import { ReportCard } from "@/components/report-card";

import styles from "./resolved.module.scss";
import { Card, CardBody } from "@/components/card/card";

export const Resolved = () => {
  const { setSelectedReport, reports } = useReportsManager();

  return (
    <Card fullWidth>
      <CardBody>
        {!reports && <CircularProgressIndicator center />}
        {reports && reports.filter((r) => r.resolved).length === 0 ? (
          <Banner message="No resolved reports" type="neutral" />
        ) : (
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
        )}
      </CardBody>
    </Card>
  );
};
