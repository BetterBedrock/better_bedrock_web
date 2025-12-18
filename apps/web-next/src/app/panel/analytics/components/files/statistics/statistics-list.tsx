
import { StatisticsCard } from "@/_components/statistics-card";
import { AnalyticsDto } from "@/_lib/api";
import { simplifyAnalytics } from "@/_lib/analytics";

import styles from "./statistics.module.scss";

interface StatisticsListProps {
  analytics?: AnalyticsDto[] | undefined;
}

export const StatisticsList = ({ analytics }: StatisticsListProps) => {
  const data = simplifyAnalytics({ analytics: analytics ?? [] });

  return (
    <div className={styles.list}>
      {Object.keys(data ?? []).map((name, index) => (
        <StatisticsCard
          key={name + index}
          name={name}
          data={data?.[name]}
          className={styles.card}
        />
      ))}
    </div>
  );
};
