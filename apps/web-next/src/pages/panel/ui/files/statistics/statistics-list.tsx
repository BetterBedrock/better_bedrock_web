import { AnalyticsDto } from "@/shared/lib/openapi";
import { StatisticsCard } from "@/widgets/statistics-list";

import styles from "./statistics.module.scss";
import { simplifyAnalytics } from "@/entities/analytic";

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
