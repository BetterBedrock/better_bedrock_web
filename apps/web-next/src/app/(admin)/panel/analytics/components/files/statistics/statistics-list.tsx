import { StatisticsCard } from "@/components/statistics-card";
import { AnalyticsDto } from "@/lib/api";
import { simplifyAnalytics } from "@/lib/analytics";

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
