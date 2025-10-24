import { StatisticsCard } from "~/components/bedrock/statistics-card";
import { CircularProgressIndicator } from "~/components/bedrock/circular-progress-indicator";
import { Banner } from "~/components/bedrock/banner";

import { styles, useFetchAnalytics } from ".";

export const Stats = () => {
  const { data, analytics } = useFetchAnalytics();

  if (!analytics) {
    return <CircularProgressIndicator className={styles.loading} size="medium" />;
  }

  if (Object.keys(data ?? []).length < 1) {
    return <Banner type="neutral" message="No statistics available" />;
  }

  return (
    <div className={styles.list}>
      <div className={styles.projects}>
        {Object.keys(data ?? []).map((name, index) => (
          <StatisticsCard
            key={name + index}
            name={name}
            data={data?.[name]}
            className={styles.card}
          />
        ))}
      </div>
    </div>
  );
};
