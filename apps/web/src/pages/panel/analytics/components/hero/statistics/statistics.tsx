import { CircularProgressIndicator } from "~/components/bedrock/circular-progress-indicator";
import { StatisticsList } from "~/pages/panel/analytics/components/hero/statistics/statistics-list";

import { styles, useStatistics } from ".";

export const Statistics = () => {
  const { analytics, vouchers } = useStatistics();

  if (!analytics || !vouchers) {
    return <CircularProgressIndicator center />;
  }

  return (
    <div className={styles.data}>
      <StatisticsList analytics={analytics} vouchers={vouchers} />
    </div>
  );
};
