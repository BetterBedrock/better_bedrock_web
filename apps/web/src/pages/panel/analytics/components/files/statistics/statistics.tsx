import { StatisticsList, styles, useStatistics } from ".";
import { CircularProgressIndicator } from "~/components/bedrock/circular-progress-indicator";

export const Statistics = () => {
  const { analytics } = useStatistics();

  if (!analytics) {
    return <CircularProgressIndicator center />;
  }

  return (
    <div className={styles.data}>
      <StatisticsList analytics={analytics} />
    </div>
  );
};
