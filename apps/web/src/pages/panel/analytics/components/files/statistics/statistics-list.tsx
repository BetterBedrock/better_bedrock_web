import { StatisticsCard } from "~/components/bedrock/statistics-card";
import { useSimplifyAnalytics } from "~/hooks/use-simplify-analytics";
import { AnalyticsDto } from "~/lib/api";

import { styles } from ".";

interface StatisticsListProps {
  analytics?: AnalyticsDto[] | undefined;
}

export const StatisticsList = ({ analytics }: StatisticsListProps) => {
  const data = useSimplifyAnalytics({ analytics: analytics ?? [] });

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
