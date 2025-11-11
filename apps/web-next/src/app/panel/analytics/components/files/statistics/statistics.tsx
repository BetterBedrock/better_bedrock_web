import { fetchAllAnalytics } from "@/_lib/analytics/fetch-all-analytics";
import { StatisticsList, styles } from ".";

export const Statistics = async () => {
  const analytics = await fetchAllAnalytics();

  return (
    <div className={styles.data}>
      <StatisticsList analytics={analytics} />
    </div>
  );
};
