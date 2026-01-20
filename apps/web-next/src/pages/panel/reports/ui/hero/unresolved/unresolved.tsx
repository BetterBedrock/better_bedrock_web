import { Banner } from "@/shared/ui/banner";
import { CircularProgressIndicator } from "@/shared/ui/circular-progress-indicator";
import { useReportsManager } from "@/pages/panel/reports/model/reports-manager";
import { Card, CardBody } from "@/shared/ui/card/card";
import { ReportCard } from "@/pages/panel/reports/ui/hero/report-card";

import styles from "./unresolved.module.scss";

export const Unresolved = () => {
  const { setSelectedReport, reports } = useReportsManager();

  return (
    <Card fullWidth>
      <CardBody>
        {!reports && <CircularProgressIndicator center />}
        {reports && reports.length === 0 ? (
          <Banner message="No unresolved reports" type="neutral" />
        ) : (
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
        )}
      </CardBody>
    </Card>
  );
};
