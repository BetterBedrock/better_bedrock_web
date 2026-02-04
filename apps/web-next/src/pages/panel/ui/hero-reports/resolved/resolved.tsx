import { Banner } from "@/shared/ui/banner";
import { CircularProgressIndicator } from "@/shared/ui/circular-progress-indicator";
import { useReportsManager } from "@/pages/panel/model/reports-manager";
import { Card } from "@/shared/ui/card";
import { ReportCard } from "@/pages/panel/ui/hero-reports/report-card";

import styles from "./resolved.module.scss";

export const Resolved = () => {
  const { setSelectedReport, reports } = useReportsManager();

  return (
    <Card fullWidth>
      <Card.Body>
        {!reports && <CircularProgressIndicator center />}
        {reports && reports.filter((r) => r.resolved).length === 0 ? (
          <Banner message="No resolved reports." type="neutral" />
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
      </Card.Body>
    </Card>
  );
};
